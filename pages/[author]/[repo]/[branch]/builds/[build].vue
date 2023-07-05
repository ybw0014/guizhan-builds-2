<script setup lang="ts">
import { Project } from 'guizhan-builds-2-data'

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
  validate: async (route) => {
    return /^\d+$/.test(route.params.build as string) && parseInt(route.params.build as string) > 0
  },
})
</script>

<template>
  <Head>
    <Title>{{ t('pages.build.title', { name, branch, build }) }}</Title>
  </Head>
  <div class="flex flex-col md:flex-row gap-4">
    <div class="flex gap-2 grow">
      <div class="text-3xl">
        {{ t('pages.build.build', { name, branch, build }) }}
      </div>
      <div class="grow"></div>
      <button class="build-button primary">
        <Icon name="mdi:download-outline" class="text-xl" />
        {{ t('pages.build.download') }}
      </button>
    </div>
    <div class="flex basis-80">
      <div class="card bg-default border">
        
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.build-button {
  @apply rounded-md p-3 bg-gray-200 font-semibold whitespace-nowrap dark:bg-gray-600;

  &.primary {
    @apply bg-blue-500 text-white;
  }
}
</style>
