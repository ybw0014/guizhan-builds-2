<script setup lang="ts">
import { Project } from 'guizhan-builds-data'
import { useGitHubReadmeParsed } from '~/composables/useGitHub'

const { t } = useI18n()

const props = defineProps<{
  project: Project
}>()

if (!props.project) {
  throw createError({ statusCode: 500, statusMessage: 'Project does not exist.' })
}
const project: Ref<Project> = ref(props.project)

const name = ref(project.value.repository || '')
const branch = ref(project.value.branch || '')
const readme = await useGitHubReadmeParsed(project.value)

definePageMeta({
  name: 'project',
})
</script>

<template>
  <Head>
    <Title>{{ t('pages.project.title', { name, branch }) }}</Title>
  </Head>
  <div class="flex flex-col md:flex-row gap-4">
    <!-- 左侧项目 README.md -->
    <div class="card bg-default grow">
      <div v-if="readme">
        <div class="p-4 mb-4 text-md text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300">
          <Icon name="ion:warning-outline" />
          {{ t('pages.project.readmeWarning') }}
        </div>
        <article v-html="readme"></article>
      </div>
      <div v-else>{{ t('pages.project.readmeFail') }}</div>
    </div>
    <!-- 右侧多卡片信息栏 -->
    <div class="flex flex-col gap-4 basis-80">
      <div class="card bg-default">
        <h3 class="text-xl font-bold mb-2">
          {{ t('pages.project.buildStatus') }}
        </h3>
        <div class="flex justify-center">
          <BuildStatus :project="project" />
        </div>
      </div>
      <div class="card bg-default">
        <h3 class="text-xl font-bold mb-2">
          {{ t('pages.project.requirements') }}
        </h3>
        <div class="flex">
          <ProjectRequirements :requirements="project.displayOptions?.requirements" :vertical="true" size="xl" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
