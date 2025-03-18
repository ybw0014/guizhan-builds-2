<script setup lang="ts">
import type { Project } from 'guizhan-builds-2-types';
import { watchDebounced } from '@vueuse/core';
import _ from 'lodash';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const sortTypes = useProjectSortTypes();
const filters = await useProjectFilters();

const query = ref((route.query.q as string) || '');
const activeSortType = ref((route.query.sortBy as string) || sortTypes.value[0]);
// 不设置类型的话，没法使用 string index
const activeFilters = ref<any>({
  server: (route.query.server as string) || '',
  mcVersion: (route.query.mcVersion as string) || ''
});
const page = ref(route.query.page ? Number(route.query.page) : 1);
const filteredList = ref<Project[] | null>();

const projectList = ref<Element | null>(null);
const pageResetAnchor = ref<Element | null>(null);

const projects = await useProjects();
const buildTime = await useR2Asset<Record<string, number>>('buildTimestamp.json');

const queryParams = computed(() => {
  const params: Record<string, any> = {};
  if (query.value) {
    params.q = query.value;
  }
  if (activeSortType.value) {
    params.sortBy = activeSortType.value;
  }
  if (page.value > 1) {
    params.page = page.value;
  }
  if (activeFilters.value.server) {
    params.server = activeFilters.value.server;
  }
  if (activeFilters.value.mcVersion) {
    params.mcVersion = activeFilters.value.mcVersion;
  }
  return params;
});

watchDebounced(
  queryParams,
  async () => {
    filteredList.value = null;
    await router.replace({ query: queryParams.value });
    filterList();
  },
  { deep: true, debounce: 250 }
);

function updatePage(newPage: number) {
  if (page.value === newPage) {
    return;
  }
  page.value = newPage;
  if (process.client && pageResetAnchor.value) {
    window.scrollBy(0, pageResetAnchor.value.getBoundingClientRect().y);
  }
}

function filterList() {
  if (!projects.value) {
    return;
  }

  // 隐藏的项目不显示
  let filtered: Project[] = _.filter(projects.value, (project: Project) => !project.displayOptions?.hidden);

  // 名称
  if (query.value) {
    filtered = _.filter(filtered, (project: Project) => {
      const q = query.value.toLowerCase();
      return (project.repository.toLowerCase().includes(q) ||
        project.displayOptions?.keywords?.some((keyword: string) => keyword.toLowerCase().includes(q))) as boolean;
    });
  }

  // 过滤 服务端软件
  if (activeFilters.value.server) {
    filtered = _.filter(filtered, (project: Project) => {
      const requirements = useProjectRequirements(project);
      if (requirements.has('paper')) {
        return activeFilters.value.server === 'paper';
      }
      return true;
    });
  }

  // 过滤 MC 版本
  if (activeFilters.value.mcVersion) {
    filtered = _.filter(filtered, (project: Project) => {
      const requirements = useProjectRequirements(project);
      if (requirements.has('minecraft')) {
        return useMcVersionAtLeast(activeFilters.value.mcVersion, requirements.get('minecraft')!);
      }
      return true;
    });
  }

  // 排序
  switch (activeSortType.value) {
    case 'name':
      filtered = _.sortBy(filtered, (project: Project) => project.repository.toLowerCase());
      break;
    case 'newest':
      filtered = _.cloneDeep(filtered).reverse();
      break;
    case 'updated':
      if (buildTime.data) {
        const buildTimestamp = buildTime.data.value as Record<string, number>;
        filtered = _.sortBy(filtered, (project: Project) => buildTimestamp[project.key]).reverse();
      } else {
        filtered = _.cloneDeep(filtered).reverse();
      }
      break;
  }
  filteredList.value = filtered;
}

onMounted(() => {
  filterList();
});
</script>

<template>

  <Head>
    <Title>{{ t('pages.projects.title') }}</Title>
  </Head>
  <div class="flex flex-col gap-4 items-center">
    <h1 ref="pageResetAnchor" class="text-3xl font-bold mt-4">
      {{ t('pages.projects.title') }}
    </h1>
    <h2 class="text-xl">{{ t('pages.projects.subTitle') }}</h2>
    <!-- 搜索框 -->
    <div class="relative rounded-md flex shadow-md w-full max-w-screen-md">
      <!-- 输入 -->
      <input v-model="query" class="query-input" type="text"
        :placeholder="t('pages.projects.query', { num: projects?.length })" />
      <!-- 小屏幕排序方式 -->
      <UPopover class="md:hidden relative flex">
        <UButton icon="i-ic-round-sort" class="query-sort" />
        <template #panel="{ close }">
          <div class="flex flex-col">
            <ULink v-for="sortType in sortTypes" :key="sortType" :class="{
              'px-4 py-2 text-left link-box': true,
              active: activeSortType === sortType
            }" @click="
                activeSortType = sortType;
              close();
              ">
              {{ t(`sortTypes.${sortType}`) }}
            </ULink>
          </div>
        </template>
      </UPopover>
    </div>
    <!-- 大屏幕排序方式 -->
    <div class="justify-center md:flex gap-2 hidden">
      <a v-for="sortType in sortTypes" :key="sortType" href="javascript:void(0)"
        :class="{ 'link-box sort-type': true, active: activeSortType === sortType }" @click="activeSortType = sortType">
        {{ t(`sortTypes.${sortType}`) }}
      </a>
    </div>
  </div>
  <div v-if="filteredList" class="flex items-start justify-center mt-4 flex-col md:flex-row gap-6">
    <!-- 项目列表 -->
    <div class="w-full max-w-4xl min-w-0 mb-5 flex flex-col lg:mb-0">
      <ProjectList ref="projectList" :projects="filteredList" :page="page" @update:page="updatePage" />
    </div>
    <div class="card bg-default min-w-[300px] flex flex-col gap-4 border-t-4 !border-blue-500 w-full md:w-auto">
      <div v-for="filter in filters" :key="filter.id">
        <ProjectFilter v-model="activeFilters[filter.id]" :label="t(`filters.${filter.id}.title`)" :filter="filter.id"
          :values="filter.values" :i18n="filter.i18n" />
      </div>
    </div>
  </div>
  <div v-else class="flex flex-col items-center mt-8">
    <UIcon name="i-mdi-loading" class="w-24 h-24 animate-spin" />
  </div>
</template>

<style scoped lang="scss">
.query-input {
  @apply rounded-l-md md:rounded-md p-4 basis-full min-w-0 border-none dark:bg-gray-700;
}
.query-sort {
  @apply bg-blue-500 text-white rounded-r-md rounded-l-none px-2;
}
.sort-type {
  @apply px-4 py-2 rounded-md;
}
</style>
