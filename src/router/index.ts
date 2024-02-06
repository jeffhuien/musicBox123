import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import testRoute from '@/router/test'
import leftMenu from '@/router/leftMenu'
import LeftSongList from './LeftSongList'
import { auth, main } from '@/stores'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/layout/main/index.vue'),
      children: [...leftMenu, ...LeftSongList],
      redirect: 'recommend',
    },
    {
      path: '/play',
      name: 'play',
      component: () => import('@/layout/play/index.vue'),
      children: [
        {
          path: 'b',
          name: 'b',
          component: () => import('@/views/main/index.vue'),
        },
      ],
    },

    {
      path: '/search',
      name: 'search',
      component: () => import('@/layout/search/index.vue'),
      children: [
        {
          path: 'b',
          name: 'b',
          component: () => import('@/views/main/index.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/404.vue'),
    },

    {
      path: '/:pathMatch(.*)',
      redirect: '/404',
    },

    //测试路由
    ...testRoute,
  ],
})

router.beforeEach((to, from) => {
  if (to.meta.login && !auth().isLogin) {
    ElMessage({
      message: '需要登录',
      duration: 2000,
      type: 'warning',
    })
    main().loginShow = true
    return '/login'
  }
})

export default router
