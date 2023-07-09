<script setup lang="ts">
const props = defineProps<{
  page: string
}>();
const { locale } = useI18n();
const { data } = await useAsyncData("home", () => queryContent(`/${locale.value}/${props.page}`).findOne());
</script>

<template>
  <ContentRenderer tag="article" :value="data" class="markdown" />
</template>
