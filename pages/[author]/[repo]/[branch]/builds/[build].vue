<script setup lang="ts">
import { Project } from "guizhan-builds-2-data";
import FormCheckBox from "~/components/ui/FormCheckbox.vue";
import { useSettingsStore } from "~/stores/useSettingsStore";

const { t } = useI18n();
const route = useRoute();
const settingsStore = useSettingsStore();

const props = defineProps<{
  project: Project
}>();

const name = ref(props.project?.repository || "");
const branch = ref(props.project?.branch || "");
const buildId = ref(parseInt(route.params.build as string));

const build = await useBuild(props.project, buildId.value);

if (!build.value) {
  throw createError({ statusCode: 404 });
}

const downloadModal = ref();
const downloadConfirm = ref<boolean>(settingsStore.confirmDownload);

onMounted(() => {
  if (route.query.download) {
    handleDownload();
  }
});

function handleDownload() {
  if (!settingsStore.confirmDownload) {
    downloadModal.value.openModal();
  } else {
    download();
  }
}
function handleDownloadConfirm() {
  settingsStore.setConfirmDownload(downloadConfirm.value);
  downloadModal.value.closeModal();
  download();
}
function handleDownloadCancel() {
  downloadModal.value.closeModal();
}

function getBuildRes(filename: string) {
  return useR2AssetPath(`${props.project.author}/${props.project.repository}/${props.project.branch}/${filename}`).value;
}

function download() {
  const path = getBuildRes(build.value?.target || "");
  window.open(path, "_blank");
}

definePageMeta({
  name: "build",
  validate: async (route) => {
    return /^\d+$/.test(route.params.build as string) && parseInt(route.params.build as string) > 0;
  }
});
</script>

<template>
  <Head>
    <Title>{{ t('pages.build.title', { name, branch, build: buildId }) }}</Title>
  </Head>
  <div v-if="build" class="flex flex-col md:flex-row gap-4">
    <div class="flex flex-col gap-2 grow">
      <div class="flex grow-0">
        <div class="flex flex-col gap-2">
          <div class="text-3xl">
            {{ t('pages.build.build', { name, branch, build: buildId }) }}
            <BuildStatusIcon :success="build.success" />
          </div>
          <div class="text-md text-gray-600 dark:text-gray-400">
            {{ t('pages.build.buildAt', { time: $dayjs(build.buildTimestamp).format('lll') }) }}
            <a :href="getBuildRes(`Build-${buildId}.log`)" class="a-link" target="_blank">{{ t('pages.build.logs') }}</a>
          </div>
        </div>
        <div class="grow"></div>
        <div class="flex flex-col justify-center">
          <button class="button primary" :disabled="!build.success" @click="handleDownload">
            <Icon name="mdi:download-outline" class="text-xl" />
            {{ t('pages.build.download') }}
          </button>
        </div>
      </div>
      <div class="card bg-default flex-col items-center">
        <span class="text-gray-400">
          {{ t('pages.build.commitAt', { author: build.author, time: $dayjs(build.timestamp).format('lll') }) }}
          (<a
            :href="`https://github.com/${project.author}/${project.repository}/commit/${build.commit}`"
            class="a-link"
            target="_blank"
          >
            {{ build.commit.slice(0, 7) }} </a
          >):
        </span>
        <span>{{ build.message }}</span>
      </div>
    </div>
    <div class="flex flex-col basis-80 shrink-0 gap-4">
      <div class="card bg-default">
        <h3 class="text-xl font-bold mb-2">
          {{ t('pages.project.requirements') }}
        </h3>
        <div class="flex">
          <ProjectRequirements
            :requirements="project.displayOptions?.requirements"
            :vertical="true"
            size="xl"
            :before="buildId"
          />
        </div>
      </div>
      <div class="card bg-default">
        <h3 class="text-xl font-bold mb-2">
          {{ t('pages.build.checksum') }}
          <ExternalLink link="https://emn178.github.io/online-tools/sha1_checksum.html" class="text-sm font-normal a-link">
            {{ t('pages.build.checksumLink') }}
          </ExternalLink>
        </h3>
        <div class="flex break-words">
          <div class="w-full">
            SHA1: {{ build.sha1 }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <CustomModal ref="downloadModal">
    <template #title>
      {{ t('pages.build.warning.title') }}
    </template>
    <template #content>
      {{ t('pages.build.warning.content') }}
    </template>
    <template #footer>
      <div class="flex flex-col gap-2">
        <div class="flex flex-col">
          <NuxtLink :to="{ name: 'terms' }" class="a-link" target="_blank">{{ t('pages.terms.title') }}</NuxtLink>
          <NuxtLink :to="{ name: 'privacy' }" class="a-link" target="_blank">{{ t('pages.privacy.title') }}</NuxtLink>
        </div>
        <FormCheckBox v-model="downloadConfirm" :label="t('pages.build.warning.confirmForever')" />
        <div class="flex gap-2 flex-wrap mt-4">
          <button type="button" class="button primary" @click="handleDownloadConfirm">
            {{ t('pages.build.warning.confirm') }}
          </button>
          <button type="button" class="button secondary" @click="handleDownloadCancel">
            {{ t('pages.build.warning.cancel') }}
          </button>
        </div>
      </div>
    </template>
  </CustomModal>
</template>
