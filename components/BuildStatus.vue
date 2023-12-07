<script setup lang="ts">
import type { Project } from 'guizhan-builds-2-data';
import LazyLoadImage from '~/components/LazyLoadImage.vue';

const props = defineProps<{
  project: Project;
  build?: number;
}>();

const imgSource = computed(() => {
  const { project } = props;
  const dir = `${project.author}/${project.repository}/${project.branch}`;
  return `/api/badge/${dir}/${props.build ?? 'latest'}`;
});
</script>

<template>
  <LazyLoadImage :source="imgSource" broken-image="/images/default_badge.svg" class="w-[110px] h-[26px]" />
</template>
