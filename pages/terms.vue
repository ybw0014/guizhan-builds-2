<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t('pages.terms.title'),
})
</script>

<template>
  <MarkdownContent page="terms" />
</template>
