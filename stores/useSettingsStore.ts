import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => {
    return {
      confirmDownload: false,
    }
  },
  actions: {
    setConfirmDownload(confirmDownload: boolean) {
      this.confirmDownload = confirmDownload
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
})
