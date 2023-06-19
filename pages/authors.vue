<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const query = ref<string>((route.query.q as string) || '')
</script>

<template>
  <Head>
    <Title>{{ t('pages.authors.title') }}</Title>
  </Head>
  <div class="flex flex-col gap-4">
    <PageTitle>{{ t('pages.authors.title') }}</PageTitle>
  </div>
</template>
