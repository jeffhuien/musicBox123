<script lang="ts" setup>
import { AuthApi } from '@/Api/Auth'
import router from '@/router'
import { auth, main } from '@/stores'
import { storeToRefs } from 'pinia'
const { user } = storeToRefs(auth())

function aa() {
  main().loginShow = true
  if (!auth().isLogin) {
    router.push('/login')
  }
}
let userInfo: any
if (user.value) {
  userInfo = await AuthApi.getInfo()
}
</script>
<template>
  <div class="auth" @click="aa">
    <div class="flex items-center gap-2">
      <el-avatar :src="user ? user?.data.profile.avatarUrl : 'img/logo.png'" />
      <div class="opacity-50">
        <p class="text-xs">{{ user ? user.data.profile.nickname : '登录' }}</p>
        <!-- <p class="bg-sky-500 h-[.2rem] scale-75" /> -->
        <p class="rounded-xl border-2 px-2 -translate-x-1 text-xs scale-75 text-white bg-pink-600">
          Lv.{{ user ? userInfo.data.level : '0' }}
        </p>
      </div>
    </div>
  </div>
</template>
