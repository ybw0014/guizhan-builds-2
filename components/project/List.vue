<script setup lang="ts">
import { Project } from "guizhan-builds-2-data";
const { t } = useI18n();

const sizePerPage = 10;

const props = withDefaults(
  defineProps<{
    projects: Project[];
    page?: number;
  }>(),
  {
    page: 1
  }
);
const emit = defineEmits<{
  (e: "update:page", page: number): void;
}>();

const slicedProjects = ref<Project[] | null>();
const page = ref(props.page);

const totalPages = computed(() => {
  if (!props.projects) {
    return 0;
  }
  return Math.ceil(props.projects.length / sizePerPage);
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
  if (!props.projects) {
    return;
  }
  recalcPage();
  const start = (page.value - 1) * sizePerPage;
  const end = start + sizePerPage;
  slicedProjects.value = props.projects.slice(start, end);
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
    <div v-for="project in slicedProjects" :key="project.key">
      <ProjectCard :project="project" />
    </div>
    <PaginationButtons v-show="slicedProjects" :page="page" :pages="totalPages" @update:page="updatePage" />
  </div>
  <div v-else>
    {{ t("components.projectList.noResult") }}
  </div>
</template>
