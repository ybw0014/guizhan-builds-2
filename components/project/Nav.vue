<script setup lang="ts">
import { Project } from 'guizhan-builds-data'

const props = defineProps<{
  project: Project
}>()

const { t } = useI18n()
const route = useRoute()

const issuesLink = computed<string | null>(() => {
  if (!props.project) {
    return null
  }
  return `https://github.com/${props.project.author}/${props.project.repository}/issues`
})
const sourceLink = computed<string | null>(() => {
  if (!props.project) {
    return null
  }
  return `https://github.com/${props.project.author}/${props.project.repository}/tree/${props.project.branch}`
})
</script>

<template>
  <nav class="mt-3 mb-4 flex flex-wrap border-b-2 border-gray-200 dark:border-gray-800 gap-2">
    <ProjectNavItem :to="{ name: 'project' }" :active="['project'].includes(route.name as string)">
      {{ t('components.projectNav.introduction') }}
    </ProjectNavItem>
    <ProjectNavItem :to="{ name: 'builds' }" :active="['builds', 'build'].includes(route.name as string)">
      {{ t('components.projectNav.builds') }}
    </ProjectNavItem>
    <ProjectNavItem v-if="issuesLink" :href="issuesLink">
      {{ t('components.projectNav.issues') }}
    </ProjectNavItem>
    <ProjectNavItem v-if="sourceLink" :href="sourceLink">
      {{ t('components.projectNav.source') }}
    </ProjectNavItem>
  </nav>
</template>
