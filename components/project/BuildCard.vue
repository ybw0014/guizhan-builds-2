<script setup lang="ts">
import { Project, BuildInfo } from "guizhan-builds-2-data";
const { t } = useI18n();
const router = useRouter();

const props = defineProps<{
  project: Project;
  build: BuildInfo;
}>();

function handleCardClick() {
  router.push({
    name: "build",
    params: {
      author: props.project.author,
      repo: props.project.repository,
      branch: props.project.branch,
      build: props.build.id
    }
  });
}
</script>

<template>
  <div class="build-card card bg-default hoverable" @click="handleCardClick">
    <div class="flex flex-col gap-2">
      <div class="text-lg font-semibold">
        {{ t("components.projectBuildCard.build", { build: build.id }) }}
        <BuildStatusIcon :success="build.success" />
      </div>
      <div class="text-sm text-gray-600 dark:text-gray-400">{{ $dayjs(build.buildTimestamp).format("lll") }}</div>
      <ProjectRequirements :requirements="props.project.displayOptions?.requirements" :title="true" :before="build.id" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.build-card {
  @apply cursor-pointer border border-gray-300 dark:border-gray-800;
}
</style>
