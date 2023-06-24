<script setup lang="ts">
import { Project } from 'guizhan-builds-data'
import LazyLoadImage from '~/components/LazyLoadImage.vue'

const props = defineProps<{
  project: Project
}>()
</script>

<template>
  <LazyLoadImage source="/images/default_plugin.webp" brokenImage="/images/default_plugin.webp" class="rounded-md" />
</template>
