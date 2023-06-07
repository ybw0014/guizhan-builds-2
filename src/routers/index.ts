import router from '@/routers/router';
import NProgress from '@/config/nprogress';
import { GlobalStore } from '@/store';

router.beforeEach((to, from, next) => {
  NProgress.start();
  const globalStore = GlobalStore();

  if (!to.matched.some((record) => record.meta.requiresAuth)) return next();
  return next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
