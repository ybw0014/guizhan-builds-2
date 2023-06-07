import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    props: true,
    component: () => import('@/views/projects.vue'),
  },
  // {
  //   path: '/:pathMatch(.*)',
  //   redirect: { name: '404' },
  // }
];
const router = createRouter({
  history: createWebHistory('/'),
  routes: routes as RouteRecordRaw[],
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export default router;
