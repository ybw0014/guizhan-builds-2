<script setup lang="ts">
import { Project } from "guizhan-builds-2-data";
import LazyLoadImage from "~/components/LazyLoadImage.vue";

defineProps<{
  project: Project
}>();
</script>

<template>
  <LazyLoadImage source="/images/default_plugin.webp" broken-image="/images/default_plugin.webp" class="rounded-md" />
</template>
