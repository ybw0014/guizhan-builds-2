<script setup lang="ts">
import type { Project } from 'guizhan-builds-2-data';
import _ from 'lodash';
import { watchDebounced } from '@vueuse/core';
import type { RouteParams } from 'vue-router';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const props = defineProps<{
  project: Project;
}>();

const page = ref(route.query.page ? Number(route.query.page) : 1);

const builds = await useBuilds(props.project);
const reversedBuilds = builds.value ? _.reverse(_.clone(builds.value.builds)) : [];

const queryParams = computed(() => {
  const params: Record<string, any> = {};
  if (page.value > 1) {
    params.page = page.value;
  }
  return params;
});

watchDebounced(
  queryParams,
  async () => {
    await router.replace({ query: queryParams.value });
  },
  { deep: true, debounce: 250 }
);

function updatePage(newPage: number) {
  if (page.value === newPage) {
    return;
  }
  page.value = newPage;
}

onMounted(async () => {
  if (route.query.download) {
    await handleDownload(route.params);
  }
});

onBeforeRouteUpdate((to, from, next) => {
  if (to.name !== from.name) {
    next();
    return;
  }
  if (to.query.download) {
    handleDownload(to.params);
    return;
  }
  next();
});

async function handleDownload(params: RouteParams) {
  const latestSuccessfulBuild = await useLatestSuccessfulBuild(props.project);
  if (!latestSuccessfulBuild.value) {
    return;
  }
  router.replace({
    name: 'build',
    params: {
      ...params,
      build: latestSuccessfulBuild.value.id
    },
    query: {
      download: 1
    }
  });
}

definePageMeta({
  name: 'builds'
});
</script>

<template>
  <Head>
    <Title>{{ t('pages.builds.title', { name: project?.repository || '', branch: project?.branch || '' }) }}</Title>
  </Head>
  <div>
    <ProjectBuilds v-if="builds" :project="project" :builds="reversedBuilds" :page="page" @update:page="updatePage" />
    <div v-else>{{ t('pages.builds.notFound') }}</div>
  </div>
</template>
