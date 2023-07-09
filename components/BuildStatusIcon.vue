<script setup lang="ts">
defineProps<{
  success: boolean
}>();
</script>

<template>
  <Icon v-if="success" name="mdi:tick-circle" class="text-green-500" />
  <Icon v-else name="mdi:close-circle" class="text-red-500" />
</template>
