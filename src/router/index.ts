import leftMenu from '@/router/leftMenu'
import testRoute from '@/router/test'
import { auth, main } from '@/stores'
import { createRouter, createWebHashHistory } from 'vue-router'
import LeftSongList from './LeftSongList'

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
  console.log(to.name, to.meta)

  if (to.meta.login && !auth().isLogin) {
    ElMessage({
      message: '需要登录',
      duration: 2000,
      type: 'warning',
    })
    main().loginShow = true
    return '/login'
  }

  if (to.name === 'login' && auth().isLogin) {
    ElMessage.success('已经登录过了 ')
    return from
  }
})

export default router
