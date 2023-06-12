import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
  }),
  actions: {
  },
  persist: {
    storage: localStorage,
  },
})
