<script setup lang="ts">
import { useCacheStore } from '~/stores/useCacheStore';

const { $dayjsR } = useNuxtApp();
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const cacheStore = useCacheStore();

const subscriptions = [
  {
    type: 'free',
    icon: 'i-mdi-package-variant-closed-check',
    price: 0,
    privileges: ['canaryBuilds', 'issuesSupport']
  },
  {
    type: 'monthly',
    icon: 'i-mdi-brightness-2',
    price: 6,
    privileges: ['devBuilds', 'newFeatures']
  },
  {
    type: 'seasonly',
    icon: 'i-mdi-brightness-4',
    price: 15,
    privileges: ['devBuilds', 'newFeatures']
  },
  {
    type: 'annually',
    icon: 'i-mdi-brightness-7',
    price: 80,
    privileges: ['devBuilds', 'techSupport', 'newFeatures']
  }
];

const devModalOpen = ref(false);
const queryBtnDisabled = ref(false);
const orderId = ref<string>(cacheStore.orderNum);
const devCheckErrMsg = ref<string>('');
const devDownloadLink = ref<string>('');
const lastUpdateTime = ref<number | null>();
const lastUpdateCommit = ref<string>('');
const saveOrder = ref(false);
const noUpdate = ref(false);

function getFree() {
  router.push({ name: 'builds', params: { author: 'StarWishsama', repo: 'Slimefun4', branch: 'master' } });
}
function subscribe() {
  window.open('https://afdian.com/a/nora1ncity', '_blank', 'noopener noreferrer');
}

onMounted(() => {
  route.hash === '#getdev' && getDevBuilds();
});

function getDevBuilds() {
  devModalOpen.value = true;

  // 获取最后更新时间
  if (!lastUpdateTime.value) {
    setTimeout(async () => {
      const lastUpdateRes = await useSubLastUpdate();
      if (!lastUpdateRes.value) {
        lastUpdateTime.value = -1;
        return;
      }
      lastUpdateTime.value = lastUpdateRes.value?.last_update;
      lastUpdateCommit.value = lastUpdateRes.value?.commit_info || '';
      checkUpdate();
    }, 1);
  } else {
    checkUpdate();
  }

  // 如果uuid有缓存，则获取下载链接
  if (cacheStore.uuidExpireAt !== -1) {
    useSubLog('has uuid cache');
    const now = $dayjsR().unix();
    if (now < cacheStore.uuidExpireAt) {
      useSubLog('uuid cache not expired');
      // 直接获取下载链接
      setTimeout(async () => {
        await getDownloadLink(cacheStore.uuid);
      }, 1);
    } else {
      useSubLog('uuid cache expired, clearing');
      cacheStore.setUuidExpireAt(-1);
      cacheStore.setUuid('');
    }
  }

  devCheckErrMsg.value = '';
}

function closeDevCheck() {
  devModalOpen.value = false;
}

function checkUpdate() {
  if (!lastUpdateTime.value) return;
  if (cacheStore.lastUpdateAt === -1) return;
  noUpdate.value = lastUpdateTime.value <= cacheStore.lastUpdateAt;
}

async function checkOrder() {
  if (!orderId.value) return;

  if (!/^\d+$/.test(orderId.value)) {
    devCheckErrMsg.value = t('pages.sfSubscription.devCheck.error.malformedOrderId');
    return;
  }

  queryBtnDisabled.value = true;
  devCheckErrMsg.value = '';

  if (saveOrder.value) {
    cacheStore.setOrderNum(orderId.value);
  }

  // 查询订单
  const orderData = await useSubValidation(orderId.value);
  if (!orderData.value) {
    devCheckErrMsg.value = t('pages.sfSubscription.devCheck.error.http');
    queryBtnDisabled.value = false;
    return;
  }
  if (orderData.value.expired) {
    devCheckErrMsg.value = t('pages.sfSubscription.devCheck.error.invalidOrderId');
    queryBtnDisabled.value = false;
    return;
  }

  const uuid = orderData.value.uuid as string;

  // 缓存订单信息
  const uuidExpireAt = $dayjsR().add(1, 'hour').unix();
  cacheStore.setOrderExpireAt(orderData.value.expire_time);
  cacheStore.setUuid(uuid);
  cacheStore.setUuidExpireAt(uuidExpireAt);

  // 获取下载链接
  await getDownloadLink(uuid, true);
}

async function getDownloadLink(uuid: string, errorMsg = false) {
  const downloadLink = await useSubDownload(uuid);
  if (!downloadLink.value) {
    if (errorMsg) {
      devCheckErrMsg.value = t('pages.sfSubscription.devCheck.error.cannotGetLink');
    }
    queryBtnDisabled.value = false;
    return;
  }

  devDownloadLink.value = downloadLink.value;
}

function devDownload() {
  cacheStore.setLastUpdateAt(lastUpdateTime.value || -1);

  const url = new URL(devDownloadLink.value);
  const filename = url.pathname.split('/').pop() as string;
  useDownloadHelper(url, filename);
}
</script>

<template>

  <Head>
    <Title>{{ t('pages.sfSubscription.title') }}</Title>
  </Head>
  <div class="flex flex-col gap-12 mt-14 items-center">
    <div class="text-2xl font-semibold">{{ t('pages.sfSubscription.title') }}</div>
    <div class="text-lg text-gray-600 dark:text-gray-400">{{ t('pages.sfSubscription.description') }}</div>
    <div class="text-lg">
      <a href="#getdev" class="a-link" @click="getDevBuilds">{{ t('pages.sfSubscription.subscribeAlready') }}</a>
    </div>
    <div class="flex flex-col lg:flex-row gap-6">
      <section v-for="sub in subscriptions" :key="sub.type" class="pricing-card card bg-default">
        <div class="text-base">
          <UIcon :name="sub.icon" />
          {{ t(`pages.sfSubscription.subscription.${sub.type}`) }}
        </div>
        <div>
          <span class="text-3xl font-semibold"> ¥ {{ sub.price }} </span>
          <span class="ml-2 text-base text-gray-600 dark:text-gray-400">
            {{ t(`pages.sfSubscription.price.${sub.type}`) }}
          </span>
        </div>
        <div class="subscribe">
          <UButton v-if="sub.type === 'free'" block color="gray" size="xl" variant="solid" @click="getFree">
            {{ t('pages.sfSubscription.download') }}
          </UButton>
          <UButton v-else block size="xl" variant="solid" @click="subscribe">
            {{ t('pages.sfSubscription.subscribe') }}
          </UButton>
        </div>
        <ul class="divide-y divide-gray-200 text-gray-700 dark:text-gray-300 dark:divide-gray-600">
          <li v-for="priviledge in sub.privileges" :key="priviledge" class="priviledge flex gap-2 items-center py-2">
            <UIcon name="i-mdi-tick-circle-outline" class="w-6 h-6 text-blue-400" />
            {{ t(`pages.sfSubscription.priviledge.${priviledge}`) }}
          </li>
        </ul>
      </section>
    </div>
    <div class="text-gray-500 text-sm">* {{ t('pages.sfSubscription.footnotes') }}</div>
  </div>

  <UModal v-model="devModalOpen" prevent-close>
    <UCard>
      <template #header>
        <div class="text-lg flex justify-between">
          <h2 class="flex items-center gap-2 font-semibold">
            <UIcon name="i-mdi-cloud-download-outline" />
            {{ t('pages.sfSubscription.devCheck.title') }}
          </h2>
          <UButton color="gray" variant="link" :padded="false" @click="closeDevCheck">
            <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
          </UButton>
        </div>
      </template>
      {{ t('pages.sfSubscription.devCheck.form.description') }}
      <div class="flex flex-col gap-4">
        <a href="https://afdian.com/dashboard/order" target="_blank" class="a-link" tabindex="-1">
          {{ t('pages.sfSubscription.devCheck.form.orders') }}
        </a>
        <div v-if="!devDownloadLink" class="flex flex-col gap-4">
          <UiInputText ref="getdev" v-model="orderId" :label="t('pages.sfSubscription.devCheck.form.label')" />
          <div v-if="devCheckErrMsg" class="text-red-500">{{ devCheckErrMsg }}</div>
          <UCheckbox v-model="saveOrder" name="saveOrder" :label="t('pages.sfSubscription.devCheck.form.save')" />
          <UButton block size="lg" icon="i-heroicons-magnifying-glass" :loading="queryBtnDisabled" @click="checkOrder">
            {{ t('pages.sfSubscription.devCheck.form.query') }}
          </UButton>
        </div>
        <div v-else class="flex flex-col gap-4">
          <UButton block size="lg" @click="devDownload">
            <UIcon name="i-heroicons-arrow-down-tray" class="w-6 h-6" />
            {{ t('pages.sfSubscription.devCheck.form.download') }}
          </UButton>
        </div>
      </div>
      <template #footer>
        <div v-if="lastUpdateTime && lastUpdateTime !== -1" class="text-gray-500 text-sm flex flex-col gap-2">
          <div class="flex gap-2">
            {{ t('pages.sfSubscription.devCheck.version.lastUpdate', { time: $dayjs(lastUpdateTime).format('lll') }) }}
            <div v-if="noUpdate" class="font-bold">
              {{ t('pages.sfSubscription.devCheck.version.noUpdate') }}
            </div>
          </div>
          <div class="truncate">
            {{ t('pages.sfSubscription.devCheck.version.updateInfo', { changelog: lastUpdateCommit }) }}
          </div>
        </div>
        <div v-else-if="lastUpdateTime && lastUpdateTime === -1" class="text-gray-500 text-sm">
          {{ t('pages.sfSubscription.devCheck.version.fail') }}
        </div>
        <div v-else class="text-gray-500 text-sm">
          {{ t('pages.sfSubscription.devCheck.version.checking') }}
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<style scoped lang="scss">
.pricing-card {
  @apply flex flex-col gap-4 w-[90vw] lg:w-auto lg:min-w-[260px] border border-gray-200 dark:border-gray-700;

  .subscribe > button {
    @apply w-full;
  }
}
</style>
