<template>
  <div class="outline-none transition-all duration-700 w-full h-full dark:bg-gray-800 dark:text-gray-400">
    <Suspense>
      <router-view v-slot="{ Component }">
        <transition
          mode="out-in"
          :enter-active-class="`animate__animated ${
            $route.meta.enter && $route.matched.length == 1
              ? // 针对play页面这种需要动画的根路由，matched.length == 1 表示是根路由
                $route.meta.enter
              : 'animate__fadeIn'
          }`">
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
import { main, playControl } from './stores'
import { getIsMobile } from '@/utils'
const { config, isMobile } = storeToRefs(main())
onMounted(() => {
  let dom = document.documentElement
  playControl().isPlay = false

  window.matchMedia('(prefers-color-scheme: dark)') ?? false
    ? //
      false
    : (config.value.colorMode = ColorModeConfig.system)

  function setColor(value: string) {
    if (value === 'system') {
      dom.classList.value = ''
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? dom.classList.add('dark')
        : dom.classList.remove('dark')
    } else {
      dom.classList.value = value
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
