<script setup lang="ts">
import { Project } from 'guizhan-builds-data'

const props = defineProps<{
  project: Project
}>()

const name = ref(props.project.displayOptions?.name || props.project.repository)
const authors = ref(props.project.displayOptions?.author || props.project.author)
const keywords = ref(props.project.displayOptions?.keywords?.slice(0, 2))
</script>

<template>
  <div class="project-card bg-default hoverable">
    <div class="flex gap-2">
      <!-- 左侧 logo -->
      <div class="flex flex-col justify-center">
        <Icon name="clarity:plugin-line" class="logo" />
      </div>
      <!-- 项目名称与作者 -->
      <div class="flex flex-col">
        <div class="plugin-name">{{ name }}</div>
        <Authors :authors="authors" />
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
      <!-- 右侧关键词信息 -->
      <div class="shrink-0 flex">
        
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.project-card {
  @apply rounded-md w-full border border-gray-300 p-4 overflow-auto cursor-pointer;
  @apply dark:border-gray-800;

  .logo {
    @apply w-12 h-12 rounded-md;
  }

  .plugin-name {
    @apply font-semibold text-lg;
  }

  .plugin-tag {
    @apply text-sm text-gray-600 dark:text-gray-400;
  }
}
</style>
