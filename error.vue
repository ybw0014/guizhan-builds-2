<script lang="ts" setup>
import { NuxtError } from 'nuxt/app';

const props = defineProps<{
  error: NuxtError;
}>();

let i18n: any;
try {
  i18n = useI18n();
} catch (e) {
  console.error('cannot load i18n', e);
}

const statusCode = computed(() => {
  return Number(props.error.statusCode || 500);
});

const text = computed(() => {
  switch (statusCode.value) {
    case 404:
      return i18n?.t('error.404') || '404';
    case 401:
      return i18n?.t('error.401') || '401';
    case 403:
      return i18n?.t('error.403') || '403';
    default:
      return props.error.message;
  }
});

const title = computed(() => {
  switch (statusCode.value) {
    case 404:
    case 401:
    case 403:
      return statusCode.value;
    default:
      return i18n?.t('error.unknown') || 'Unknown error';
  }
});
</script>

<template>
  <Head>
    <Title>{{ title }}</Title>
  </Head>
  <NuxtLayout>
    <div class="flex flex-col items-center justify-center min-h-[70vh]">
      <h1 class="text-4xl font-bold">{{ title }}</h1>
      <h2 class="text-xl font-bold">{{ text }}</h2>
    </div>
  </NuxtLayout>
</template>
