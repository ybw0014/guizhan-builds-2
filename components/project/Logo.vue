<script setup lang="ts">
import { Project } from 'guizhan-builds-2-data';
import LazyLoadImage from '~/components/LazyLoadImage.vue';

const props = defineProps<{
  project: Project;
}>();

const defaultImage = '/images/default_plugin.webp';
const projectIcon = computed(() => {
  if (props.project.displayOptions?.logo) {
    return `https://cdn.jsdelivr.net/gh/SlimefunGuguProject/Slimefun-Icons/images/${props.project.displayOptions.logo}`;
  }
  return defaultImage;
});
</script>

<template>
  <LazyLoadImage :source="projectIcon" :broken-image="defaultImage" class="rounded-md" />
</template>
