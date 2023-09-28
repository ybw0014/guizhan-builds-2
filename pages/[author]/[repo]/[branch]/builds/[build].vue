<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { useDropZone, useFileDialog } from "@vueuse/core";
import CryptoJS from "crypto-js";
import { Project } from "guizhan-builds-2-data";
import { useSettingsStore } from "~/stores/useSettingsStore";

const { t } = useI18n();
const route = useRoute();
const settingsStore = useSettingsStore();

const props = defineProps<{
  project: Project;
}>();

const name = ref(props.project?.repository || "");
const branch = ref(props.project?.branch || "");
const buildId = ref(parseInt(route.params.build as string));

const build = await useBuild(props.project, buildId.value);

if (!build.value) {
  throw createError({ statusCode: 404 });
}

const downloadModalOpen = ref(false);
const checksumDropzone = ref<HTMLDivElement>();
const downloadConfirm = ref<boolean>(settingsStore.confirmDownload);
const checksumResult = ref<string>("");

useDropZone(checksumDropzone, onChecksumFileDrop);
const { open: openChecksumFile, onChange: onChecksumFileChange } = useFileDialog();

onMounted(() => {
  if (route.query.download) {
    handleDownload();
  }
});

function handleDownload() {
  if (!settingsStore.confirmDownload) {
    downloadModalOpen.value = true;
  } else {
    download();
  }
}
function handleDownloadConfirm() {
  settingsStore.setConfirmDownload(downloadConfirm.value);
  downloadModalOpen.value = false;
  download();
}
function handleDownloadCancel() {
  downloadModalOpen.value = false;
}

function getBuildRes(filename: string) {
  return useR2AssetPath(`${props.project.author}/${props.project.repository}/${props.project.branch}/${filename}`).value;
}

function download() {
  const path = getBuildRes(build.value?.target || "");
  useDownloadHelper(new URL(path, window.location.origin));
}

// Checksum 部分

function onChecksumFileDrop(files: File[] | null) {
  files && validateChecksum(files[0]);
}

onChecksumFileChange((files: FileList | null) => {
  files && validateChecksum(files[0]);
});

function validateChecksum(file: File) {
  if (file.size > 64 * 1024 * 1024) {
    // 64MB
    return;
  }

  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onload = () => {
    checksumResult.value = CryptoJS.SHA1(CryptoJS.lib.WordArray.create(reader.result as any as number[])).toString();
  };
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
    <Title>{{ t("pages.build.title", { name, branch, build: buildId }) }}</Title>
  </Head>
  <div v-if="build" class="flex flex-col md:flex-row gap-4">
    <div class="flex flex-col gap-2 grow">
      <div class="flex grow-0">
        <div class="flex flex-col gap-2">
          <div class="text-3xl">
            {{ t("pages.build.build", { name, branch, build: buildId }) }}
            <BuildStatusIcon :success="build.success" />
          </div>
          <div class="text-md text-gray-600 dark:text-gray-400">
            {{ t("pages.build.buildAt", { time: $dayjs(build.buildTimestamp).format("lll") }) }}
            <a :href="getBuildRes(`Build-${buildId}.log`)" class="a-link" target="_blank">{{ t("pages.build.logs") }}</a>
          </div>
        </div>
        <div class="grow"></div>
        <div class="flex flex-col justify-center">
          <UButton size="lg" :disabled="!build.success" @click="handleDownload">
            <Icon name="mdi:download-outline" class="text-xl" />
            {{ t("pages.build.download") }}
          </UButton>
        </div>
      </div>
      <div class="card bg-default flex-col items-center">
        <span class="text-gray-400">
          {{ t("pages.build.commitAt", { author: build.author, time: $dayjs(build.timestamp).format("lll") }) }}
          (<a :href="`https://github.com/${project.author}/${project.repository}/commit/${build.commit}`" class="a-link" target="_blank">
            {{ build.commit.slice(0, 7) }} </a
          >):
        </span>
        <span>{{ build.message }}</span>
      </div>
    </div>
    <div class="flex flex-col basis-80 shrink-0 gap-4">
      <div class="card bg-default">
        <h3 class="text-xl font-bold mb-2">
          {{ t("pages.project.requirements") }}
        </h3>
        <div class="flex">
          <ProjectRequirements :project="project" :vertical="true" size="xl" :before="buildId" />
        </div>
      </div>
      <div class="card bg-default">
        <h3 class="text-xl font-bold mb-2">
          {{ t("pages.build.checksum.title") }}
        </h3>
        <div class="flex break-words">
          <div class="w-full">
            {{ t("pages.build.checksum.sha1", { checksum: build.sha1 }) }}
          </div>
        </div>
        <Disclosure>
          <DisclosureButton
            v-slot="{ open }"
            class="flex w-full justify-between rounded-lg bg-primary-100 px-4 py-2 text-left text-sm font-medium text-primary-900 hover:bg-primary-200 dark:bg-primary-800 dark:text-primary-100 dark:hover:bg-primary-700 focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75"
          >
            {{ t("pages.build.checksum.check") }}
            <Icon :name="open ? 'icon-park:up' : 'icon-park:down'" class="h-5 w-5 text-primary-500 dark:text-primary-100" />
          </DisclosureButton>
          <DisclosurePanel class="text-gray-500 flex flex-col gap-2">
            <div ref="checksumDropzone" class="flex items-center justify-center w-full" @click="openChecksumFile()">
              <div for="checksum-file" class="file-dropzone">
                <div class="flex flex-col gap-3 items-center justify-center p-6">
                  <Icon name="mdi:file-upload-outline" class="w-10 h-10 text-gray-400" />
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">{{ t("pages.build.checksum.click") }}</span>
                    {{ t("pages.build.checksum.drag") }}
                  </p>
                </div>
              </div>
            </div>
            <div v-if="checksumResult" :class="[checksumResult === build.sha1 ? 'text-green-500' : 'text-red-500', 'break-words']">
              {{ t("pages.build.checksum.sha1", { checksum: checksumResult }) }}
            </div>
          </DisclosurePanel>
        </Disclosure>
      </div>
    </div>
  </div>

  <UModal v-model="downloadModalOpen" prevent-close>
    <UCard>
      <template #header>
        <div class="text-lg flex justify-between">
          <h2 class="flex items-center gap-2 font-semibold">
            <Icon name="mdi:alert" />
            {{ t("pages.build.warning.title") }}
          </h2>
        </div>
      </template>
      <div class="flex flex-col gap-2">
        <p>{{ t("pages.build.warning.content") }}</p>
        <div class="flex flex-col">
          <ULink :to="{ name: 'terms' }" class="a-link" target="_blank">{{ t("pages.terms.title") }}</ULink>
          <ULink :to="{ name: 'privacy' }" class="a-link" target="_blank">{{ t("pages.privacy.title") }}</ULink>
        </div>
        <UCheckbox v-model="downloadConfirm" name="downloadConfirm" :label="t('pages.build.warning.confirmForever')" />
      </div>
      <template #footer>
        <div class="flex gap-2 flex-wrap justify-end">
          <UButton size="lg" @click="handleDownloadConfirm">
            {{ t("pages.build.warning.confirm") }}
          </UButton>
          <UButton color="gray" size="lg" @click="handleDownloadCancel">
            {{ t("pages.build.warning.cancel") }}
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<style scoped lang="scss">
.file-dropzone {
  @apply flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-800 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500;
}
</style>
