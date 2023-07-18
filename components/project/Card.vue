<script setup lang="ts">
import { Project } from "guizhan-builds-2-data";
const router = useRouter();

const props = defineProps<{
  project: Project;
}>();

const name = ref(props.project.displayOptions?.name || props.project.repository);
const keywords = ref(props.project.displayOptions?.keywords?.slice(0, 2));
const branch: string | null = isMainBranch(props.project.branch) ? null : props.project.branch;

function handleCardClick() {
  router.push({
    name: "project",
    params: {
      author: props.project.author,
      repo: props.project.repository,
      branch: props.project.branch
    }
  });
}
</script>

<template>
  <div class="card bg-default hoverable cursor-pointer border" @click="handleCardClick">
    <div class="flex gap-2">
      <!-- 左侧 logo -->
      <div class="flex flex-col justify-center">
        <ProjectLogo :project="props.project" class="w-12 h-12" />
      </div>
      <!-- 项目名称与作者 -->
      <div class="flex flex-col">
        <div class="font-semibold text-lg">
          {{ name }}
          <span v-if="branch !== null" class="ml-2 font-light text-base whitespace-nowrap">
            <Icon name="ph:git-branch-light" />
            {{ branch }}
          </span>
        </div>
        <Authors :project="project" />
        <div v-if="keywords" class="flex text-sm text-gray-600 dark:text-gray-400">
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
          <ProjectRequirements :requirements="props.project.displayOptions?.requirements" :vertical="true" :title="true" />
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
