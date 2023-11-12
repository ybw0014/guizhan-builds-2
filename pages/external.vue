<script setup lang="ts">
import { useSettingsStore } from '~/stores/useSettingsStore';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const settingsStore = useSettingsStore();

const externalLink = Array.isArray(route.query.link) ? route.query.link[0] : route.query.link;
const host = computed<string | null>(() => {
  if (!externalLink) {
    return null;
  }
  try {
    return new URL(externalLink).host;
  } catch (ignored) {
    return null;
  }
});
const isTrustedDomain = computed(() => {
  return host.value && settingsStore.trustedHosts.includes(host.value);
});

if (isTrustedDomain.value) {
  go();
}

function trust() {
  if (host.value) {
    settingsStore.addTrustedHost(host.value);
  }
  go();
}

function go() {
  if (process.client) {
    location.href = externalLink as string;
  }
}

async function back() {
  if (!window.history.state.back) {
    window.close();
  } else {
    await router.back();
  }
}
</script>

<template>
  <Head>
    <Title>{{ t("pages.external.title") }}</Title>
  </Head>
  <div v-if="!isTrustedDomain" class="card bg-default flex flex-col gap-4">
    <div class="text-xl font-bold">
      {{ t("pages.external.title") }}
    </div>
    <div class="text-md">
      {{ t("pages.external.content") }}
    </div>
    <div class="text-md text-gray-500">
      {{ externalLink }}
    </div>
    <div class="flex flex-row gap-2">
      <UButton size="lg" @click="trust">
        {{ t("pages.external.trust") }}
      </UButton>

      <UButton size="lg" @click="go">
        {{ t("pages.external.continue") }}
      </UButton>

      <UButton color="gray" size="lg" @click="back">
        {{ t("pages.external.cancel") }}
      </UButton>
    </div>
  </div>
  <div v-else>
    {{ t("pages.external.redirecting") }}
  </div>
</template>
