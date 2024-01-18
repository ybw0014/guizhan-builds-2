<script setup lang="ts">
import type { Project } from 'guizhan-builds-2-data';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const props = defineProps<{
  project: Project;
}>();

const author = ref(props.project.author);
const repo = ref(props.project.repository);
const name = ref(props.project.displayOptions?.name || props.project.repository);
const branch = ref(props.project.branch);

async function download() {
  const latestSuccessfulBuild = await useLatestSuccessfulBuild(props.project);
  router.push({
    name: 'builds',
    params: route.params,
    query: { download: latestSuccessfulBuild.value ? 1 : 0 }
  });
}
</script>

<template>
  <div v-if="project" class="card w-full bg-default project-header">
    <div class="flex flex-row gap-4">
      <ProjectLogo :project="project" class="w-12 h-12 md:w-24 md:h-24" />
      <div class="flex flex-col">
        <div class="text-lg md:text-xl flex gap-0 md:gap-2 flex-col md:flex-row">
          <ULink :to="{ name: 'author', params: { author } }" class="link-box rounded-md px-1">
            {{ author }}
          </ULink>
          <span class="text-gray-500 hidden md:inline">/</span>
          <ULink :to="{ name: 'repo', params: { author, repo } }" class="link-box rounded-md font-bold px-1">
            {{ name }}
          </ULink>
        </div>
        <span class="text-sm md:text-base px-1">
          <UIcon name="i-mdi-source-branch" />
          {{ branch }}
        </span>
      </div>
    </div>
    <div class="grow"></div>
    <div class="flex flex-col justify-center">
      <UButton ref="downloadBtn" icon="i-mdi-download-outline" size="xl" @click="download">
        {{ t('components.projectHeader.download') }}
      </UButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.project-header {
  @apply flex flex-col md:flex-row gap-4 border-t-4 border-blue-500;
}
</style>
