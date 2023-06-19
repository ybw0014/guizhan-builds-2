<script setup lang="ts">
import { Project } from 'guizhan-builds-data'

defineProps<{
  projects: Project[]
}>()
</script>

<template>
  <div>
    <div v-for="project in projects" :key="project.key">
      {{ project.repository }}
    </div>
  </div>
</template>
