<script setup lang="ts">
const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const author = ref<string>(route.params.author as string);
const repo = ref<string>(route.params.repo as string);
const projects = await useProjectRepository(author.value, repo.value);

await verify();

function verify() {
  if (!projects.value || projects.value.length === 0) {
    throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
  } else if (projects.value.length === 1) {
    const project = projects.value[0];
    // 如果只有1个结果则直接重定向
    router.replace({
      name: "project",
      params: {
        author: project.author,
        repo: project.repository,
        branch: project.branch
      }
    });
  }
}

definePageMeta({
  name: "repo"
});
</script>

<template>
  <Head>
    <Title>{{ t('pages.repo.title', { repo }) }}</Title>
  </Head>
  <div class="flex flex-col items-center">
    <div class="flex flex-col gap-4 w-full max-w-4xl">
      <div v-if="projects" class="min-w-0 mb-5 flex flex-col gap-2 lg:mb-0">
        <ProjectList ref="projectList" :projects="projects" />
      </div>
    </div>
  </div>
</template>
