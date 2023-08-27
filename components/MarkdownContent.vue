<script setup lang="ts">
const props = defineProps<{
  page: string;
}>();
const { locale } = useI18n();
const path = `/${locale.value.toLowerCase()}/${props.page}`;
</script>

<template>
  <ContentDoc :path="path" tag="article" class="markdown">
    <template #empty> Loading... </template>
    <template #not-found> Error </template>
  </ContentDoc>
</template>
