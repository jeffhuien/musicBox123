import { defineStore } from 'pinia'
import { AuthType } from '#/auth'
import { AuthApi, loginApi } from '@/Api'
import { store } from '@/utils'
export default defineStore(
  'auth',
  () => {
    let user = ref<AuthType>({
      profile: {
        userId: 0,
      },
    } as any)
    const isLogin = ref(false)
    const level = ref(0)
    const UID = computed(() => user.value?.profile?.userId)
    const likeIds = ref<number[]>([])
    // 设置用户信息
    function setAuthInfo(u: AuthType) {
      user.value = u
      isLogin.value = true
    }

    async function getUserInfo() {
      let t: any
      if (UID.value != 0) {
        t = await AuthApi.getAccount()
        user.value = t
      } else {
        t = await loginApi.getAnonimousCookie()
        store.set('cookie', t.cookie)
      }

      // let t1 = await AuthApi.getInfo(t.profile.userId)
      // console.log(t1)
    }

    function $reset() {
      user.value = {
        profile: {
          userId: 0,
        },
      } as any
      isLogin.value = false
      level.value = 0
      likeIds.value = []
      store.remove('cookie')
      getUserInfo()
    }

    return {
      //
      user,
      setAuthInfo,
      isLogin,
      level,
      UID,
      likeIds,

      //funs
      getUserInfo,
      $reset,
    }
  },
  {
    persist: true,
  },
)
