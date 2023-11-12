<script setup lang="ts">
import { RouteLocationNormalized } from 'vue-router';

const route = useRoute();

const author = ref<string>(route.params.author as string);
const repository = ref<string>(route.params.repo as string);
const branch = ref<string>(route.params.branch as string);
const project = await useProject(author.value, repository.value, branch.value);
await verify(route);

async function verify(to: RouteLocationNormalized) {
  if (!project.value) {
    // 如果项目没有查询到，则尝试查询跳转到仓库页面
    const repos = await useProjectRepository(author.value, repository.value);
    if (!repos.value || repos.value.length === 0) {
      throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
    }
    
    await navigateTo({
      name: 'repo',
      params: {
        author: author.value,
        repo: repository.value
      }
    });
  } else if (to.params.author !== project.value.author || to.params.repo !== project.value.repository || to.params.branch !== project.value.branch) {
    const newPath = project.value.author + '/' + project.value.repository + '/' + project.value.branch;
    console.debug('Redirect to ' + newPath + ' from (' + to.fullPath + ')');
    await navigateTo({
      name: 'project',
      params: {
        author: project.value.author,
        repo: project.value.repository,
        branch: project.value.branch
      }
    });
  }
}

definePageMeta({
  name: 'projectFramework'
});
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
