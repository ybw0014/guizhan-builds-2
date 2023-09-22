<script setup lang="ts">
const props = defineProps<{
  disabled?: boolean;
  label?: string;
  modelValue?: string | null;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value?: string | null): void;
}>();
const value = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val)
});
</script>

<template>
  <UiInputWrapper :value="value" :label="label" :disabled="disabled">
    <input v-model="value" type="text" :disabled="disabled" class="input-text" />
  </UiInputWrapper>
</template>

<style scoped lang="scss">
.input-text {
  @apply outline-none flex-grow bg-transparent w-full py-0.5 border-none text-black dark:text-white;
}
</style>
