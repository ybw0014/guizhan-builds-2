<script setup lang="ts">
defineProps<{
  success: boolean;
}>();
</script>

<template>
  <UIcon v-if="success" name="i-mdi-tick-circle" class="text-green-500" />
  <UIcon v-else name="i-mdi-close-circle" class="text-red-500" />
</template>
