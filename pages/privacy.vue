<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t('pages.privacy.title'),
})
</script>

<template>
  <MarkdownContent page="privacy" />
</template>
