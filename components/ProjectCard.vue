<script setup lang="ts">
import { Project } from 'guizhan-builds-data'

const props = defineProps<{
  project: Project
}>()

const name = ref(props.project.displayOptions?.name || props.project.repository)
const keywords = ref(props.project.displayOptions?.keywords?.slice(0, 2))
const branch: string | null = ['main', 'master'].includes(props.project.branch) ? null : props.project.branch
</script>

<template>
  <div class="project-card bg-default hoverable">
    <div class="flex gap-2">
      <!-- 左侧 logo -->
      <div class="flex flex-col justify-center">
        <ProjectLogo :project="props.project" />
      </div>
      <!-- 项目名称与作者 -->
      <div class="flex flex-col">
        <div class="plugin-name">
          {{ name }}
          <span v-if="branch !== null" class="plugin-branch">
            <Icon name="ph:git-branch-light" />
            {{ branch }}
          </span>
        </div>
        <Authors :project="project" />
        <div v-if="keywords" class="flex plugin-tag">
          <div class="flex flex-col justify-center mr-1">
            <Icon name="mdi:tag-outline" />
          </div>
          <span>
            <span v-for="(keyword, index) in keywords" :key="keyword">
              {{ keyword }}
              <span v-if="index + 1 < keywords.length">, </span>
            </span>
          </span>
        </div>
      </div>
      <!-- 中间留空区域 -->
      <div class="grow"></div>
      <!-- 右侧信息 -->
      <div class="shrink-0 flex gap-2">
        <div class="md:flex hidden">
          <ProjectRequirements :requirements="props.project.displayOptions?.requirements" :vertical="true" />
        </div>
        <div class="flex flex-col justify-center">
          <BuildStatus :project="props.project" />
        </div>
      </div>
    </div>
    <!-- 小屏幕右侧信息 -->
    <div class="flex md:hidden">
      <ProjectRequirements :requirements="props.project.displayOptions?.requirements" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.project-card {
  @apply shadow-md rounded-md w-full border border-gray-300 p-4 cursor-pointer flex flex-col gap-2 overflow-x-hidden;
  @apply dark:border-gray-800;

  .plugin-name {
    @apply font-semibold text-lg;
  }

  .plugin-branch {
    @apply ml-2 font-light text-base;
  }

  .plugin-tag {
    @apply text-sm text-gray-600 dark:text-gray-400;
  }
}
</style>
