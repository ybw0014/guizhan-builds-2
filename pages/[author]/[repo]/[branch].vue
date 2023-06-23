<script setup lang="ts">
import { Project } from 'guizhan-builds-data'
import _ from 'lodash'

const route = useRoute()
const project = ref<Project>()

const author = ref<string>(route.params.author as string)
const repository = ref<string>(route.params.repo as string)
const branch = ref<string>(route.params.branch as string)

const p = await useProject(author.value, repository.value, branch.value)
if (!p) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
} else {
  project.value = p
}
</script>

<template>
  <div v-if="project">
    <ProjectHeader :project="project" />
    <!-- <ProjectNav :project="project" /> -->
    <router-view v-slot="{ Component }">
      <Suspense>
        <component :is="Component" v-model:project="project" />
        <template #fallback>Loading...</template>
      </Suspense>
    </router-view>
  </div>
</template>
