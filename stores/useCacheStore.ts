import { defineStore } from "pinia";

export const useCacheStore = defineStore("cache", {
  state: () => {
    return {
      confirmDownload: false,
      trustedHosts: [
        "github.com",
        "ybw0014.dev",
        "discord.gg",
        "builds.guizhanss.net",
        "builds.guizhanss.cn",
        "builds2.guizhanss.net",
        "builds.guizhanss.com",
        "builds2.guizhanss.cn"
      ]
    };
  },
  actions: {
    setConfirmDownload(confirmDownload: boolean) {
      this.confirmDownload = confirmDownload;
    },
    addTrustedHost(host: string) {
      this.trustedHosts.push(host);
    }
  },
  persist: {
    storage: persistedState.localStorage
  }
});
