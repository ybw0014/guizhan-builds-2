<script setup lang="ts">
defineProps<{
  success: boolean
}>()
</script>

<template>
  <Icon name="mdi:tick-circle" class="text-green-500" v-if="success" />
  <Icon name="mdi:close-circle" class="text-red-500" v-else />
</template>
