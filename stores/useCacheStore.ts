import { defineStore } from "pinia";

export const useCacheStore = defineStore("cache", {
  state: () => {
    return {
      expireTimestamp: 0,
      uuid: ""
    };
  },
  actions: {
    setExpireTimestamp(expireTimestamp: number) {
      this.expireTimestamp = expireTimestamp;
    },
    setUUID(uuid: string) {
      this.uuid = uuid;
    }
  },
  persist: {
    storage: persistedState.localStorage
  }
});
