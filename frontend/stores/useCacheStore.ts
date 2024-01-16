import { defineStore } from 'pinia';

export const useCacheStore = defineStore('cache', {
  state: () => {
    return {
      // 订阅计划相关
      orderNum: '',
      orderExpireAt: -1,
      uuid: '',
      uuidExpireAt: -1,
      lastUpdateAt: -1,
      // mc版本信息相关
      mcVersions: [] as string[],
      mcVersionsLastFetchedAt: -1
    };
  },
  actions: {
    setOrderNum(orderNum: string) {
      this.orderNum = orderNum;
    },
    setOrderExpireAt(orderExpireAt: number) {
      this.orderExpireAt = orderExpireAt;
    },
    setUuid(uuid: string) {
      this.uuid = uuid;
    },
    setUuidExpireAt(uuidExpireAt: number) {
      this.uuidExpireAt = uuidExpireAt;
    },
    setLastUpdateAt(lastUpdateAt: number) {
      this.lastUpdateAt = lastUpdateAt;
    },
    setMinecraftVersions(mcVersions: string[]) {
      this.mcVersions = mcVersions;
      this.mcVersionsLastFetchedAt = Date.now();
    }
  },
  persist: {
    storage: persistedState.localStorage
  }
});
