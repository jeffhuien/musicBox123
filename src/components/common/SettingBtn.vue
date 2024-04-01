<script setup lang="ts">
import { ColorModeConfig } from '#/config'
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

const props = defineProps({
  pc: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <div :class="[props.pc ? 'inline-flex' : '']">
    <a class="group relative flex items-center [&>span]:hover:inline-block">
      <i
        class="fa-solid text-lg mr-2 w-7"
        :class="[main().config.colorMode === ColorModeConfig.dark ? 'fa-moon' : 'fa-sun']">
      </i>

      <div
        class="hidden group-hover:flex rounded-md text-sm absolute top-10 z-20 bg-white dark:bg-gray-700 dark:border-none flex-col gap-3 w-28 py-2 border">
        <p
          @click="main().config.colorMode = ColorModeConfig.dark"
          class="rounded-sm flex gap-2 items-center hover:bg-slate-500 hover:text-white px-2 py-1">
          <i class="fa-solid fa-moon"></i>
          <span>Dark</span>
        </p>
        <p
          @click="main().config.colorMode = ColorModeConfig.light"
          class="rounded-sm flex gap-2 items-center hover:bg-slate-500 hover:text-white px-2 py-1">
          <i class="fa-solid fa-sun"></i>
          <span>Light</span>
        </p>
        <p
          @click="main().config.colorMode = ColorModeConfig.system"
          class="rounded-sm flex gap-2 items-center hover:bg-slate-500 hover:text-white px-2 py-1">
          <i class="fa-solid fa-gear"></i>
          <span>System</span>
        </p>
      </div>
      <!-- <span :class="[props.pc ? 'absolute border rounded-md hidden border-red-300  p-1 top-14' : '']"> 设置 </span> -->
    </a>
    <a v-if="!auth().isLogin" @click=";(main().loginShow = true), $router.push('/login')" class="flex items-center">
      <i class="fa-solid fa-user text-lg mr-2 w-7 [&>span]:hover:inline-block"></i>
      <span :class="[props.pc ? 'absolute border rounded-md hidden border-red-300  p-1 top-14' : '']"> 登录 </span>
    </a>

    <a v-else @click="LogOut" class="flex items-center [&>span]:hover:inline-block">
      <i class="fa-solid fa-right-from-bracket text-lg mr-2 w-7"></i>
      <span :class="[props.pc ? 'absolute border rounded-md hidden border-red-300  p-1 top-14' : '']"> 注销 </span>
    </a>

    <a @click="$router.go(0)" class="flex items-center [&>span]:hover:inline-block">
      <i class="fa-solid fa-refresh text-lg mr-2 w-7"></i>
      <span :class="[props.pc ? 'absolute border rounded-md hidden border-red-300  p-1 top-14' : '']"> 更新版本 </span>
    </a>
    <a @click="$router.push({ name: 'setting' })" class="flex items-center [&>span]:hover:inline-block">
      <i class="fa-solid fa-gear text-lg mr-2 w-7"></i>
      <span :class="[props.pc ? 'absolute border rounded-md hidden border-red-300  p-1 top-14' : '']"> 设置 </span>
    </a>
  </div>
</template>

<style scoped lang="scss">
a {
  @apply text-xs p-2 mb-1 rounded-md text-gray-500;

  &.router-link-active {
    @apply font-bold bg-pink-400 text-white;
  }
}
</style>
