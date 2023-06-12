<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const { t } = useI18n()

useHead({
  titleTemplate: (titleChunk) => {
    const siteTitle = t('title')
    return titleChunk ? `${titleChunk} | ${siteTitle}` : siteTitle
  },
})
</script>

<template>
  <main :data-page="route.name" class="text-default">
    <LayoutHeader />
    <LayoutContainer>
      <slot />
    </LayoutContainer>
    <LayoutFooter />
  </main>
</template>
