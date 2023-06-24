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
const build = ref(route.params.build as string)

definePageMeta({
  name: 'build',
})
</script>

<template>
  <Head>
    <Title>{{ t('pages.build.title', { name, branch, build }) }}</Title>
  </Head>
  <div>
  </div>
</template>

<style scoped lang="scss"></style>
