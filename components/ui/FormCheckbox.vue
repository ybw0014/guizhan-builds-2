<script setup lang="ts">
const props = defineProps<{
  modelValue?: boolean
  label?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean | boolean[] | string[] | [] | undefined): void
}>()
const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
</script>

<template>
  <label class="form-checkbox">
    <input type="checkbox" v-model="value" :value="value" :disabled="disabled" class="input-checkbox" />
    <span v-if="label">{{ label }}</span>
  </label>
</template>

<style scoped lang="scss">
.form-checkbox {
  @apply flex items-center gap-2;

  input[type='checkbox'] {
    @apply w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600;
  }
}
</style>
