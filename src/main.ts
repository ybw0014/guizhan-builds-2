import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import '@/assets/styles.scss';
import router from '@/routers/index';

const app = createApp(App);
const pinia = createPinia();
const i18n = createI18n();
  
app.use(router);
app.use(pinia);
app.use(i18n);
app.mount('#app');
