import { defineStore } from 'pinia'
import { AuthType } from '#/auth'
export default defineStore(
  'auth',
  () => {
    let user = ref<AuthType>()
    const isLogin = ref(false)
    function setAuthInfo(u: AuthType) {
      user.value = u
      isLogin.value = true
      // 设置用户信息
    }
    return { user, setAuthInfo, isLogin }
  },
  {
    persist: true,
  },
)
