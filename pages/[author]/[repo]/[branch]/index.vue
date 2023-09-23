<script setup lang="ts">
import { Project } from "guizhan-builds-2-data";
import { useGitHubReadmeParsed } from "~/composables/useGitHub";

const { t } = useI18n();

const props = defineProps<{
  project: Project;
}>();

if (!props.project) {
  throw createError({ statusCode: 500, statusMessage: "Project does not exist." });
}
const project = ref(props.project);
const name = ref(project.value.repository || "");
const branch = ref(project.value.branch || "");
const showReadme = ref(false);
const readme = await useGitHubReadmeParsed(project.value);
const authors = await useProjectAuthors(project.value);

function displayReadme() {
  showReadme.value = true;
}

definePageMeta({
  name: "project"
});
</script>

<template>
  <Head>
    <Title>{{ t("pages.project.title", { name, branch }) }}</Title>
  </Head>
  <div class="flex flex-col md:flex-row gap-4">
    <!-- 左侧项目 README.md -->
    <div class="card bg-default grow">
      <div v-if="showReadme && readme">
        <div class="p-4 mb-4 text-md text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300">
          <Icon name="ion:warning-outline" />
          {{ t("pages.project.readmeWarning") }}
        </div>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <article v-html="readme"></article>
      </div>
      <div v-else-if="showReadme">{{ t("pages.project.readmeFail") }}</div>
      <div v-else class="flex flex-col items-center">
        <button class="button secondary mb-4" @click="displayReadme">
          <Icon name="gg:readme" class="text-xl" />
          {{ t("pages.project.showReadme") }}
        </button>
      </div>
    </div>
    <!-- 右侧多卡片信息栏 -->
    <div class="flex flex-col gap-4 basis-80">
      <div class="card bg-default">
        <h3 class="text-xl font-bold mb-2">
          {{ t("pages.project.buildStatus") }}
        </h3>
        <div class="flex justify-center">
          <BuildStatus :project="project" />
        </div>
      </div>
      <div class="card bg-default">
        <h3 class="text-xl font-bold mb-2">
          {{ t("pages.project.requirements") }}
        </h3>
        <div class="flex">
          <ProjectRequirements :project="project" :vertical="true" size="xl" />
        </div>
      </div>
      <div v-if="authors" class="card bg-default">
        <h3 class="text-xl font-bold mb-2">
          {{ t("pages.project.authors") }}
        </h3>
        <div class="authors">
          <NuxtLink
            v-for="author in authors"
            :key="author.name"
            :to="{ name: 'author', params: { author: author.name } }"
            class="linkbox text-blue-500 hover:underline"
          >
            <GitHubAvatar :username="author.name" class="w-12 h-12" />
            <span>{{ author.name }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.authors {
  @apply flex flex-col;

  & > * {
    @apply border-x border-t border-gray-200 p-2 flex items-center gap-2 dark:border-gray-700;
    @apply first:rounded-t-md last:rounded-b-md last:border-b;
  }
}
</style>
