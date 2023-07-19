<script setup lang="ts">
import InputText from "~/components/ui/InputText.vue";
import FormCheckbox from "~/components/ui/FormCheckbox.vue";
import { useCacheStore } from "~/stores/useCacheStore";

const { $dayjsR } = useNuxtApp();
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const cacheStore = useCacheStore();

const subscriptions = [
  {
    type: "free",
    icon: "arcticons:canary",
    price: 0,
    privileges: ["canaryBuilds", "issuesSupport"]
  },
  {
    type: "monthly",
    icon: "ic:baseline-brightness-2",
    price: 6,
    privileges: ["devBuilds", "techSupport", "newFeatures"]
  },
  {
    type: "seasonly",
    icon: "ic:baseline-brightness-4",
    price: 15,
    privileges: ["devBuilds", "techSupport", "newFeatures"]
  },
  {
    type: "annually",
    icon: "bx:brightness",
    price: 80,
    privileges: ["devBuilds", "priorTechSupport", "newFeatures"]
  }
];

const devModal = ref();
const queryBtn = ref();
const orderId = ref<string>(cacheStore.orderNum);
const devCheckErrMsg = ref<string>("");
const devDownloadLink = ref<string>("");
const lastUpdate = ref<number | null>();
const saveOrder = ref(false);
const noUpdate = ref(false);

function getFree() {
  router.push({ name: "builds", params: { author: "StarWishsama", repo: "Slimefun4", branch: "master" } });
}
function subscribe() {
  window.open("https://afdian.net/a/nora1ncity", "_blank", "noopener noreferrer");
}

onMounted(() => {
  route.hash === "#getdev" && getDevBuilds();
});

function getDevBuilds() {
  devModal.value.openModal(async () => {
    // 获取最后更新时间
    if (!lastUpdate.value) {
      setTimeout(async () => {
        const lastUpdateRes = await useSubLastUpdate();
        lastUpdate.value = lastUpdateRes.value;
        checkUpdate();
      }, 1);
    } else {
      checkUpdate();
    }

    // 如果uuid有缓存，则获取下载链接
    if (cacheStore.uuidExpireAt !== -1) {
      useSubLog("has uuid cache");
      const now = $dayjsR().unix();
      if (now < cacheStore.uuidExpireAt) {
        useSubLog("uuid cache not expired");
        // 直接获取下载链接
        setTimeout(async () => {
          await getDownloadLink(cacheStore.uuid);
        }, 1);
      } else {
        useSubLog("uuid cache expired, clearing");
        cacheStore.setUuidExpireAt(-1);
        cacheStore.setUuid("");
      }
    }
  });
  devCheckErrMsg.value = "";
}

function closeDevCheck() {
  devModal.value.closeModal();
}

function checkUpdate() {
  if (!lastUpdate.value) return;
  if (cacheStore.lastUpdateAt === -1) return;
  noUpdate.value = lastUpdate.value <= cacheStore.lastUpdateAt;
}

async function checkOrder() {
  if (!queryBtn.value) return;
  if (!orderId.value) return;

  if (!/^\d+$/.test(orderId.value)) {
    devCheckErrMsg.value = t("pages.sfSubscription.devCheck.error.malformedOrderId");
    return;
  }

  queryBtn.value.disabled = true;
  devCheckErrMsg.value = "";

  if (saveOrder.value) {
    cacheStore.setOrderNum(orderId.value);
  }

  // 查询订单
  const orderData = await useSubValidation(orderId.value);
  if (!orderData.value || orderData.value.expired) {
    devCheckErrMsg.value = t("pages.sfSubscription.devCheck.error.invalidOrderId");
    queryBtn.value.disabled = false;
    return;
  }

  const uuid = orderData.value.uuid as string;

  // 缓存订单信息
  const uuidExpireAt = $dayjsR().add(1, "hour").unix();
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
      devCheckErrMsg.value = t("pages.sfSubscription.devCheck.error.cannotGetLink");
    }
    queryBtn.value.disabled = false;
    return;
  }

  devDownloadLink.value = downloadLink.value;
}

async function devDownload() {
  cacheStore.setLastUpdateAt(lastUpdate.value || -1);

  // 使用a标签 + download设置文件名
  const aLink = document.createElement("a");
  const url = new URL(devDownloadLink.value);
  const filename = url.pathname.split("/").pop() as string;
  aLink.href = url.toString();
  aLink.target = "_blank";
  aLink.rel = "noopener noreferrer";
  aLink.setAttribute("download", filename);
  document.body.appendChild(aLink);
  aLink.click();
  document.body.removeChild(aLink);
}
</script>

<template>
  <Head>
    <Title>{{ t("pages.sfSubscription.title") }}</Title>
  </Head>
  <div class="flex flex-col gap-12 mt-14 items-center">
    <div class="text-2xl font-semibold">{{ t("pages.sfSubscription.title") }}</div>
    <div class="text-lg text-gray-600 dark:text-gray-400">{{ t("pages.sfSubscription.description") }}</div>
    <div class="text-lg">
      <a href="#getdev" class="a-link" @click="getDevBuilds">{{ t("pages.sfSubscription.subscribeAlready") }}</a>
    </div>
    <div class="flex flex-col lg:flex-row gap-6">
      <section v-for="sub in subscriptions" :key="sub.type" class="pricing-card card bg-default">
        <div class="text-base">
          <Icon :name="sub.icon" />
          {{ t(`pages.sfSubscription.subscription.${sub.type}`) }}
        </div>
        <div>
          <span class="text-3xl font-semibold"> ¥ {{ sub.price }} </span>
          <span class="ml-2 text-base text-gray-600 dark:text-gray-400">
            {{ t(`pages.sfSubscription.price.${sub.type}`) }}
          </span>
        </div>
        <div class="subscribe">
          <button v-if="sub.type === 'free'" class="button secondary" @click="getFree">
            {{ t("pages.sfSubscription.download") }}
          </button>
          <button v-else class="button primary" @click="subscribe">
            {{ t("pages.sfSubscription.subscribe") }}
          </button>
        </div>
        <ul class="divide-y divide-gray-200 text-gray-700 dark:text-gray-300 dark:divide-gray-600">
          <li v-for="priviledge in sub.privileges" :key="priviledge" class="priviledge flex gap-2 items-center py-2">
            <Icon name="mdi:tick-circle-outline" class="w-6 h-6 text-blue-400" />
            {{ t(`pages.sfSubscription.priviledge.${priviledge}`) }}
          </li>
        </ul>
      </section>
    </div>
    <div class="text-gray-500 text-sm">* {{ t("pages.sfSubscription.footnotes") }}</div>
  </div>

  <CustomModal ref="devModal" :bg-close="false">
    <template #title>
      {{ t("pages.sfSubscription.devCheck.title") }}
    </template>
    <template #content>
      {{ t("pages.sfSubscription.devCheck.description") }}
    </template>
    <template #footer>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-4">
          <a href="https://afdian.net/dashboard/order" target="_blank" class="a-link" tabindex="-1">
            {{ t("pages.sfSubscription.devCheck.navigateToOrders") }}
          </a>
          <div v-if="!devDownloadLink" class="flex flex-col gap-4">
            <InputText ref="getdev" v-model="orderId" :label="t('pages.sfSubscription.devCheck.label')" />
            <div v-if="devCheckErrMsg" class="text-red-500">{{ devCheckErrMsg }}</div>
            <FormCheckbox v-model="saveOrder" :label="t('pages.sfSubscription.devCheck.saveOrder')" />
            <button ref="queryBtn" type="button" class="button primary" @click="checkOrder">
              <Icon name="ic:round-search" class="w-6 h-6" />
              {{ t("pages.sfSubscription.devCheck.query") }}
            </button>
          </div>
          <div v-else class="flex flex-col gap-4">
            <button type="button" class="button primary" @click="devDownload">
              <Icon name="ic:round-download" class="w-6 h-6" />
              {{ t("pages.sfSubscription.devCheck.download") }}
            </button>
          </div>
          <div v-if="lastUpdate" class="text-gray-500 text-sm flex gap-2">
            {{ t("pages.sfSubscription.devCheck.lastUpdate", { time: $dayjs(lastUpdate).format("lll") }) }}
            <div v-if="noUpdate">
              {{ t("pages.sfSubscription.devCheck.noUpdate") }}
            </div>
          </div>
        </div>
        <div class="flex gap-2 flex-wrap mt-4">
          <button type="button" class="button secondary" @click="closeDevCheck">
            {{ t("pages.sfSubscription.devCheck.close") }}
          </button>
        </div>
      </div>
    </template>
  </CustomModal>
</template>

<style scoped lang="scss">
.pricing-card {
  @apply flex flex-col gap-4 w-[90vw] lg:w-auto lg:min-w-[260px] border border-gray-200 dark:border-gray-700;

  .subscribe > button {
    @apply w-full;
  }
}
</style>
