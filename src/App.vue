<template>
  <div class="transition-all duration-700 w-full h-full dark:bg-gray-800 dark:text-gray-400">
    <Suspense>
      <router-view v-slot="{ Component }">
        <transition
          mode="out-in"
          :enter-active-class="
            $route.meta.enter ? 'animate__animated ' + $route.meta.enter : 'animate__animated animate__fadeIn'
          ">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </Suspense>
  </div>
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
import { ColorModeConfig } from '#/config'
import { storeToRefs } from 'pinia'
import { main } from './stores'
import { getIsMobile } from '@/utils'

const { config, isMobile } = storeToRefs(main())
onMounted(() => {
  console.log('加载缓存...')
  config.value.colorMode = ColorModeConfig.system
  function setColor(value: string) {
    if (value === 'system') {
      document.documentElement.classList.value = ''
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? document.documentElement.classList.add('dark')
        : document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.value = value
    }
  }
  setColor(config.value.colorMode)
  watch(config.value, (newVal) => {
    setColor(newVal.colorMode)
  })

  function check() {
    if (getIsMobile()) isMobile.value = true
    else isMobile.value = false
  }
  check()
  window.onresize = () => {
    check()
  }
})
</script>
