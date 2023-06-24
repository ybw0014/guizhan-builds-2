<script setup lang="ts">
import { Project } from 'guizhan-builds-data'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const props = defineProps<{
  project: Project
}>()

definePageMeta({
  name: 'builds',
})
</script>

<template>
  <Head>
    <Title>{{ t('pages.builds.title', { name: project?.repository || '', branch: project?.branch || '' }) }}</Title>
  </Head>
  <div>
    {{ t('pages.builds.title', { name: project?.repository || '', branch: project?.branch || '' }) }}
  </div>
</template>

<style scoped lang="scss"></style>
