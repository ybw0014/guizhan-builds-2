<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <Head>
    <Title>{{ t('pages.sunset.title') }}</Title>
  </Head>
  <MarkdownContent page="sunset" />
</template>
