import { defineStore, createPinia } from 'pinia';
import piniaPersistConfig from '@/config/pinia-persistent';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { GlobalState } from '@/store/interface';

export const GlobalStore = defineStore({
  id: 'GlobalState',
  state: (): GlobalState => ({
    isLoading: false,
    isLogin: false,
    csrfToken: '',
    language: '',
    isFullScreen: false,
    agreeLicense: false,
    hasNewVersion: false,
    ignoreCaptcha: true
  }),
  getters: {},
  actions: {
    setScreenFull() {
      this.isFullScreen = !this.isFullScreen;
    },
    setLogStatus(login: boolean) {
      this.isLogin = login;
    },
    setGlobalLoading(loading: boolean) {
      this.isLoading = loading;
    },
    setCsrfToken(token: string) {
      this.csrfToken = token;
    },
    updateLanguage(language: string) {
      this.language = language;
      localStorage.setItem('lang', language);
    },
    setAgreeLicense(agree: boolean) {
      this.agreeLicense = agree;
    }
  },
  persist: piniaPersistConfig('GlobalState'),
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
