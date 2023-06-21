<script setup lang="ts">
import { Project } from 'guizhan-builds-data'

const props = defineProps<{
  project: Project
}>()
</script>

<template>
  <Icon name="clarity:plugin-line" class="logo" />
</template>

<style scoped lang="scss">
.logo {
  @apply w-12 h-12 rounded-md;
}
</style>
