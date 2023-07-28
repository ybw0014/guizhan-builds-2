<script setup lang="ts">
const props = defineProps<{
  page: string;
}>();
const { locale } = useI18n();
const { data } = await useAsyncData(props.page, () => queryContent(`/${locale.value}/${props.page}`).findOne());
</script>

<template>
  <ContentRenderer tag="article" :value="data" class="markdown">
    <template #empty>
      Loading...
    </template>
  </ContentRenderer>
</template>
