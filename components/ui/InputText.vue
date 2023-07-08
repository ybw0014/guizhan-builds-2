<script setup lang="ts">
import InputWrapper from '~/components/ui/InputWrapper.vue'
const props = defineProps<{
  disabled?: boolean
  label?: string
  modelValue?: string | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value?: string | null): void
}>()
const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>

<template>
  <InputWrapper :value="value" :label="label" :disabled="disabled">
    <input type="text" v-model="value" :disabled="disabled" class="input-text" />
  </InputWrapper>
</template>

<style scoped lang="scss">
.input-text {
  @apply outline-none flex-grow bg-transparent w-full py-0.5 border-none text-black dark:text-white;
}
</style>
