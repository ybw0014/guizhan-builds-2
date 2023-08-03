import { defineStore } from "pinia";

export const useCacheStore = defineStore("cache", {
  state: () => {
    return {
      orderNum: "",
      orderExpireAt: -1,
      uuid: "",
      uuidExpireAt: -1,
      lastUpdateAt: -1,
      lastUpdateLog: ""
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
    setLastUpdateLog(updateLog: string) {
      this.lastUpdateLog = updateLog;
    }
  },
  persist: {
    storage: persistedState.localStorage
  }
});
