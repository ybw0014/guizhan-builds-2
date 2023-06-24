<script setup lang="ts">
import { Project } from 'guizhan-builds-data'
import CustomModal from '~/components/CustomModal.vue'

const { t } = useI18n()

const props = defineProps<{
  project: Project
}>()

const author = ref(props.project.author)
const name = ref(props.project.repository)
const branch = ref(props.project.branch)
const downloadModal = ref()

function handleDownload() {
  downloadModal.value.openModal()
}
</script>

<template>
  <div v-if="project" class="card bg-default project-header">
    <div class="flex flex-row gap-4">
      <ProjectLogo :project="project" class="w-12 h-12 md:w-24 md:h-24" />
      <div class="flex flex-col">
        <div class="text-lg md:text-xl flex gap-2 flex-col md:flex-row">
          <NuxtLink :to="{ name: 'author', params: { author: author } }" class="link-box rounded-md px-1">{{ author }}</NuxtLink>
          <span class="text-gray-500 hidden md:inline">/</span>
          <span class="font-bold px-1">{{ name }}</span>
        </div>
        <span class="text-sm md:text-base px-1">
          <Icon name="ph:git-branch-light" />
          {{ branch }}
        </span>
      </div>
    </div>
    <div class="grow"></div>
    <div class="flex flex-col justify-center">
      <button ref="downloadBtn" class="project-header-button" @click="handleDownload">
        <Icon name="mdi:download-outline" class="text-xl" />
        {{ t('components.projectHeader.download') }}
      </button>
    </div>
  </div>
  <CustomModal ref="downloadModal">
    <template #title>
      {{ t('components.projectHeader.warning.title') }}
    </template>
    <template #content>
      {{ t('components.projectHeader.warning.content') }}
    </template>
    <template #footer>
      <button type="button" class="project-header-button" @click="downloadModal.value.closeModal()">
        {{ t('compoents.projectHeader.warning.confirm') }}
      </button>
    </template>
  </CustomModal>
</template>

<style scoped lang="scss">
.project-header {
  @apply flex flex-col md:flex-row gap-4 border-t-4 border-blue-500;
}
.project-header-button {
  @apply rounded-md bg-blue-500 text-white p-3 font-semibold;
}
</style>
