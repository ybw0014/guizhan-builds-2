<script setup lang="ts">
defineProps<{
  link: string;
}>();
</script>

<template>
  <NuxtLink :to="useExternalLinkHelper(link)" target="_blank">
    <slot></slot>
  </NuxtLink>
</template>
