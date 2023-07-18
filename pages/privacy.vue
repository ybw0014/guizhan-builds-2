<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <Head>
    <Title>{{ t("pages.privacy.title") }}</Title>
  </Head>
  <MarkdownContent page="privacy" />
</template>
