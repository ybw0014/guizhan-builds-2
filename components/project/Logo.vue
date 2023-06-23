<script setup lang="ts">
import { Project } from 'guizhan-builds-data'

const props = defineProps<{
  project: Project
}>()
</script>

<template>
  <img src="/images/default_plugin.webp" class="rounded-md" />
</template>
