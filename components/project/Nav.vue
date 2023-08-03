<script setup lang="ts">
import { Project } from "guizhan-builds-2-data";

const props = defineProps<{
  project: Project;
}>();

const { t } = useI18n();
const route = useRoute();

const issuesLink = computed<string | null>(() => {
  if (!props.project) {
    return null;
  }
  return `https://github.com/${props.project.author}/${props.project.repository}/issues`;
});
const sourceLink = computed<string | null>(() => {
  if (!props.project) {
    return null;
  }
  return `https://github.com/${props.project.author}/${props.project.repository}/tree/${props.project.branch}`;
});
const wikiLink = computed<string | null>(() => {
  if (!props.project) {
    return null;
  }
  return props.project.displayOptions?.wiki ?? null;
});
</script>

<template>
  <nav class="mt-3 mb-4 flex flex-wrap border-b-2 border-gray-200 dark:border-gray-800 gap-2">
    <ProjectNavItem :to="{ name: 'project' }" :active="['project'].includes(route.name as string)">
      {{ t("components.projectNav.introduction") }}
    </ProjectNavItem>
    <ProjectNavItem :to="{ name: 'builds' }" :active="['builds'].includes(route.name as string)">
      {{ t("components.projectNav.builds") }}
    </ProjectNavItem>
    <ProjectNavItem v-if="issuesLink" :to="useExternalLinkHelper(issuesLink)" :external="true">
      {{ t("components.projectNav.issues") }}
    </ProjectNavItem>
    <ProjectNavItem v-if="sourceLink" :to="useExternalLinkHelper(sourceLink)" :external="true">
      {{ t("components.projectNav.source") }}
    </ProjectNavItem>
    <ProjectNavItem v-if="wikiLink" :to="useExternalLinkHelper(wikiLink)" :external="true">
      {{ t("components.projectNav.wiki") }}
    </ProjectNavItem>
  </nav>
</template>
