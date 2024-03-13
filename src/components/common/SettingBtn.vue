<script setup lang="ts">
import { auth, main } from '@/stores'
import { logOut } from '@/utils'
import { ElMessageBox } from 'element-plus'

function LogOut() {
  ElMessageBox.confirm('确认要注销登录吗？', {
    confirmButtonText: '是',
    cancelButtonText: '否',
    type: 'warning',
  }).then(() => {
    logOut()
    ElMessage({
      type: 'success',
      message: 'bye bye~',
    })
  })
}
</script>

<template>
  <div>
    <a v-if="!auth().isLogin" @click=";(main().loginShow = true), $router.push('/login')" class="flex items-center">
      <i class="fa-solid fa-user text-lg mr-2 w-7"></i>
      登录
    </a>

    <a v-else @click="LogOut" class="flex items-center">
      <i class="fa-solid fa-user text-lg mr-2 w-7"></i>
      注销
    </a>

    <a @click="$router.go(0)" class="flex items-center">
      <i class="fa-solid fa-refresh text-lg mr-2 w-7"></i>
      更新版本
    </a>
    <a @click="$router.push({ name: 'setting' })" class="flex items-center">
      <i class="fa-solid fa-gear text-lg mr-2 w-7"></i>
      设置
    </a>
  </div>
</template>

<style scoped lang="scss">
a {
  @apply text-xs p-2 mb-1 rounded-md text-gray-500 hover:bg-gray-50;

  &.router-link-active {
    @apply font-bold bg-pink-400 text-white;
  }
}
</style>
