<script setup lang="ts">
import { AuthApi, loginApi } from '@/Api/Auth'
import router from '@/router'
import { auth, main } from '@/stores'
import { store } from '@/utils'
let loginEl = ref<HTMLElement>()
let loginImg = ref<string>('')
let log = ref(false)
let timer: NodeJS.Timeout

watch(main(), async () => {
  if (main().loginShow) {
    await login()
  }
})

function close() {
  loginEl.value?.classList.toggle('animate__zoomOut')
  clearInterval(timer)
  setTimeout(() => {
    main().loginShow = false
    router.go(-1)
  }, 500)
}

async function login() {
  if (auth().user?.data) {
    ElMessage.success('已经登录过了1 ')
    clearInterval(timer)
    return
  }
  let a = await loginApi.login()
  loginImg.value = a.res2.data.qrimg
  if (a.res2.data.qrimg) {
    timer = setInterval(async () => {
      const statusRes = await loginApi.checkStatus(a.key)
      if (statusRes.code === 800) {
        // alert('二维码已过期,请重新获取')
        // clearInterval(timer)
        login()
      }
      if (statusRes.code === 803) {
        // 这一步会返回cookie
        clearInterval(timer)
        ElMessage.success('授权登录成功')
        log.value = true
        main().loginShow = false
        let userInfo = await loginApi.getLoginStatus(statusRes.cookie)
        store.set('cookie', statusRes.cookie)
        let level = await AuthApi.getInfo()
        auth().setAuthInfo(userInfo)
        auth().level = level.data.level
        auth().$persist()
        router.go(-1)
        clearInterval(timer)
      }
      // if (!loginEl.value) {
      //   clearInterval(timer)
      // }
    }, 3000)
  }
}

onMounted(() => {
  login()
})

onBeforeRouteLeave(() => {
  if (!auth().isLogin) ElMessage.warning('取消登录')
  clearInterval(timer)
})
</script>

<template>
  <div
    class="fixed z-[51] top-0 left-0 flex w-screen h-screen bg-gray-200 bg-opacity-50 justify-center items-center animate__animated animate__zoomIn"
    :class="[!main().loginShow ? 'animate__zoomOut' : 'animate__zoomIn']"
    ref="loginEl">
    <div class="bg-white shadow-lg p-32 max-sm:p-12 border rounded-lg relative">
      <i class="fa-solid fa-xmark absolute top-2 right-3 text-xl hover:text-sky-400" @click="close"></i>
      <div class="flex flex-col justify-center items-center gap-3">
        <el-image class="w-52 h-52 max-sm:w-36 max-sm:h-36 bg-black" :src="loginImg"></el-image>
        <span class="text-xs opacity-60"> {{ log ? '授权成功' : '使用网易云扫码登录' }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
