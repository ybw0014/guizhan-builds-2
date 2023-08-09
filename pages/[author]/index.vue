<script setup lang="ts">
import { Project } from "guizhan-builds-2-data";
import { watchDebounced } from "@vueuse/core";
import _ from "lodash";
import InputText from "~/components/ui/InputText.vue";
import InputSelect from "~/components/ui/InputSelect.vue";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const author = ref<string>(route.params.author as string);
const query = ref();
const sortTypes = computed(() => [
  { id: "name", label: t("sortTypes.name") },
  { id: "newest", label: t("sortTypes.newest") },
  { id: "updated", label: t("sortTypes.updated") }
]);
const activeSortType = ref<string>((route.query.sortBy as string) || sortTypes.value[0].id);
const page = ref(route.query.page ? Number(route.query.page) : 1);
const filteredList = ref<Project[] | null>();
const pageResetAnchor = ref<Element | null>(null);

const projects = await useAuthorProjects(author.value);
const buildTime = await useR2Asset<Record<string, number>>("buildTimestamp.json");
await verify();

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
  return params;
});

watchDebounced(
  queryParams,
  async () => {
    filteredList.value = null;
    await router.replace({ query: queryParams.value });
    return filterList();
  },
  { deep: true, debounce: 250 }
);

async function verify() {
  if (!projects.value || projects.value.length === 0) {
    throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
  } else {
    filterList();
  }
}

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
  let filtered: Project[] = _.filter(projects.value, (project: Project) => !project.displayOptions?.hidden);
  if (query.value) {
    filtered = _.filter(projects.value, (project: Project) => {
      const q = query.value.toLowerCase();
      return (project.repository.toLowerCase().includes(q) ||
        project.displayOptions?.keywords?.some((keyword: string) => keyword.toLowerCase().includes(q))) as boolean;
    });
  }
  switch (activeSortType.value) {
    case "name":
      filtered = _.sortBy(filtered, (project: Project) => project.repository.toLowerCase());
      break;
    case "newest":
      filtered = _.cloneDeep(filtered).reverse();
      break;
    case "updated":
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

definePageMeta({
  name: "author"
});
</script>

<template>
  <Head>
    <Title>{{ t("pages.author.title", { author }) }}</Title>
  </Head>
  <div class="flex flex-col items-center">
    <div class="flex flex-col gap-4 w-full max-w-4xl">
      <div ref="pageResetAnchor" class="card bg-default author-card">
        <GitHubAvatar :username="author" class="w-12 h-12 md:w-24 md:h-24" />
        <div class="flex flex-col">
          <div class="text-xl px-1">{{ author }}</div>
          <div class="px-1 author-links">
            <NuxtLink :to="`https://github.com/${author}`" target="_blank">
              <Icon name="mdi:github" class="w-6 h-6" />
            </NuxtLink>
          </div>
        </div>
        <div class="grow"></div>
        <div class="flex flex-col">
          {{ t("pages.author.numProjects", { num: projects?.length || 0 }) }}
        </div>
      </div>
      <hr class="w-full my-1 border-gray-400 dark:border-gray-500" />
      <div class="flex gap-4">
        <InputText v-model="query" :label="t('pages.author.searchName')" />
        <InputSelect
          v-model="activeSortType"
          :values="sortTypes"
          item-text="label"
          item-value="id"
          :label="t('pages.author.sortBy')"
        />
      </div>
      <div v-if="filteredList" class="min-w-0 mb-5 flex flex-col gap-2 lg:mb-0">
        <ProjectList ref="projectList" :projects="filteredList" :page="page" @update:page="updatePage" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.author-card {
  @apply flex flex-row gap-4 border-t-4 border-blue-500;
}
.author-links a {
  @apply hover:text-blue-600 dark:hover:text-blue-400;
}
</style>
