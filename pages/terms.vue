<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <Head>
    <Title>{{ t('pages.terms.title') }}</Title>
  </Head>
  <MarkdownContent page="terms" />
</template>
