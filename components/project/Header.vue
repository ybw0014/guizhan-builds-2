<script setup lang="ts">
import { Project } from 'guizhan-builds-data'

const { t } = useI18n()

const props = defineProps<{
  project: Project
}>()

const author = ref(props.project.author)
const name = ref(props.project.repository)
const branch = ref(props.project.branch)
</script>

<template>
  <div v-if="project" class="card bg-default project-info-card">
    <ProjectLogo :project="project" class="w-12 h-12 md:w-24 md:h-24" />
    <div class="flex flex-col">
      <div class="text-lg md:text-xl flex gap-2">
        <NuxtLink :to="{ name: 'author', params: { author: author } }" class="link-box rounded-md px-1">{{ author }}</NuxtLink>
        <span class="text-gray-500">/</span>
        <span class="font-bold">{{ name }}</span>
      </div>
      <span class="text-sm md:text-base px-1">
        <Icon name="ph:git-branch-light" />
        {{ branch }}
      </span>
    </div>
    <div class="grow"></div>
    <div class="flex flex-col justify-center">
      <button class="rounded-md bg-blue-500 text-white p-3 font-semibold">
        <Icon name="mdi:download-outline" class="text-xl" />
        {{ t('components.projectHeader.download') }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.project-info-card {
  @apply flex flex-row gap-4 border-t-4 border-blue-500;
}
</style>
