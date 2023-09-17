import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", {
  state: () => {
    return {
      confirmDownload: false,
      trustedHosts: [
        "github.com",
        "ybw0014.dev",
        "discord.gg",
        "builds.guizhanss.net",
        "builds.guizhanss.cn",
        "builds.guizhanss.com"
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
