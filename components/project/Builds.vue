<script setup lang="ts">
import { Project, BuildInfo } from "guizhan-builds-2-data";
const { t } = useI18n();

const sizePerPage = 6;

const props = withDefaults(
  defineProps<{
    project: Project
    builds: BuildInfo[]
    page?: number
  }>(),
  {
    page: 1
  }
);
const emit = defineEmits<{
  (e: "update:page", page: number): void
}>();

const slicedBuilds = ref<BuildInfo[] | null>();
const page = ref(props.page);

const totalPages = computed(() => {
  if (!props.builds) {
    return 0;
  }
  return Math.ceil(props.builds.length / sizePerPage);
});

function recalcPage() {
  if (totalPages.value === 0) {
    return;
  }
  if (page.value > totalPages.value) {
    page.value = totalPages.value;
  }
  if (page.value < 1) {
    page.value = 1;
  }
}

function sliceProjects() {
  if (!props.builds) {
    return;
  }
  recalcPage();
  const start = (page.value - 1) * sizePerPage;
  const end = start + sizePerPage;
  slicedBuilds.value = props.builds.slice(start, end);
}

onMounted(() => {
  sliceProjects();
});

function updatePage(newPage: number) {
  page.value = newPage;
  sliceProjects();
  emit("update:page", newPage);
}
</script>

<template>
  <div v-if="totalPages > 0" class="flex flex-col gap-4">
    <div v-for="build in slicedBuilds" :key="build.id">
      <ProjectBuildCard :project="props.project" :build="build" />
    </div>
    <PaginationButtons v-show="slicedBuilds" :page="page" :pages="totalPages" @update:page="updatePage" />
  </div>
  <div v-else>
    {{ t('components.projectBuilds.noResult') }}
  </div>
</template>
