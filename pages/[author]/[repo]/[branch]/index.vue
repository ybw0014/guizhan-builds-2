<script setup lang="ts">
import { Project } from 'guizhan-builds-data'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const props = defineProps<{
  project: Project
}>()

const name = ref(props.project?.repository || '')
const branch = ref(props.project?.branch || '')
const projectReadme = ref<string | null>(null)

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
      <div v-if="projectReadme">
      </div>
      <div v-else>Loading...</div>
    </div>
    <!-- 右侧多卡片信息栏 -->
    <div class="flex flex-col gap-4 basis-80">
      <div class="card bg-default">
        Pending Project Info
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
