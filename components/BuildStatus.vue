<script setup lang="ts">
import { Project } from 'guizhan-builds-data'
import LazyLoadImage from './LazyLoadImage.vue'

const props = defineProps<{
  project: Project
}>()

const imgSource = computed(() => {
  const { project } = props
  let dir = project.buildOptions?.customDir
  if (!dir) {
    dir = `${project.author}/${project.repository}/${project.branch}`
  }
  return `/f/${dir}/badge.svg`
})
</script>

<template>
  <LazyLoadImage :source="imgSource" brokenImage="/images/default_badge.svg" class="w-[110px] h-[26px]" />
</template>
