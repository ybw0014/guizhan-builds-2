<script setup lang="ts">
defineProps<{
  disabled?: boolean
  label?: string
  maxlength?: number
  value: any
}>()
</script>

<template>
  <div :class="{ 'input-wrapper': true, filled: value }">
    <label class="input-label">
      <slot class="outline-none flex-grow bg-transparent w-full py-0.5"></slot>
      <span v-if="label" class="label-text">
        {{ label }}
      </span>
    </label>
  </div>
</template>

<style scoped lang="scss">
.input-wrapper {
  @apply w-full;
}
.input-label {
  @apply relative flex w-full outline-none p-2 border rounded border-gray-800 transition duration-200 ease-in opacity-60;
  @apply hover:border-gray-500 dark:border-gray-200;

  .filled & {
    @apply opacity-100;
  }
}
.label-text {
  @apply absolute origin-top-left left-2 italic pointer-events-none opacity-60 py-0.5 transition duration-200 ease-in-out;

  .filled & {
    @apply transform scale-50 text-gray-900 not-italic top-0 opacity-100 dark:text-gray-100;
  }
}
</style>
