import { defineStore } from 'pinia'
import { AuthType } from '#/auth'
import { AuthApi } from '@/Api'
export default defineStore(
  'auth',
  () => {
    let user = ref<AuthType>()
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
      let t = await AuthApi.getAccount()
      let t1 = await AuthApi.getInfo(t.profile.userId)
      console.log(t1)

      user.value = t
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
    }
  },
  {
    persist: true,
  },
)
