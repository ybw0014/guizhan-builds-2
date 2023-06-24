<script setup lang="ts">
import { RouteLocationNormalized } from 'vue-router'

const route = useRoute()

const author = ref<string>(route.params.author as string)
const repository = ref<string>(route.params.repo as string)
const branch = ref<string>(route.params.branch as string)
const project = await useProject(author.value, repository.value, branch.value)
await verify(route)

async function verify(to: RouteLocationNormalized) {
  if (!project?.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
  } else if (
    to.params.author !== project.value.author ||
    to.params.repo !== project.value.repository ||
    to.params.branch !== project.value.branch
  ) {
    const newPath = to.fullPath
      .replace(to.params.author as string, project.value.author)
      .replace(to.params.repo as string, project.value.repository)
      .replace(to.params.branch as string, project.value.branch)
    console.debug('Redirect to ' + newPath + ' from (' + to.fullPath + ')')
    await navigateTo(newPath)
  }
}
</script>

<template>
  <div v-if="project">
    <ProjectHeader :project="project" />
    <ProjectNav :project="project" />
    <router-view v-slot="{ Component }">
      <Suspense>
        <template #default><component :is="Component" v-model:project="project" /></template>
        <template #fallback>Loading...</template>
      </Suspense>
    </router-view>
  </div>
</template>
