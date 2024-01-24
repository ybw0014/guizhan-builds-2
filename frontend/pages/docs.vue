<script setup lang="ts">
const { t, locale } = useI18n()
const link: Record<string, string> = {
  'en-US': 'https://docs.ybw0014.dev/guizhan-builds/api/reference',
  'zh-CN': 'https://docs.ybw0014.dev/zh-Hans/guizhan-builds/api/reference',
  'zh-TW': 'https://docs.ybw0014.dev/zh-Hans/guizhan-builds/api/reference'
}
onMounted(() => {
  window.location.href = link[locale.value] ?? link['en-US']
})

</script>

<template>
  {{ t('pages.external.redirecting') }}
</template>
