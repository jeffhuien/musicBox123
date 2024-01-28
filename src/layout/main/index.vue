<template>
  <div class="w-full h-full flex flex-col">
    <div class="flex w-full h-full gap-3 relative">
      <div
        class="w-1/6 md:min-w-[12rem] h-full bg-white z-20 shrink-0 shadow-lg menu"
        :class="[ISMobile().isMobile ? 'animate__animated animate__slideInLeft' : '']">
        <left-menu />
      </div>
      <div class="flex-grow h-full max-sm:px-2">
        <router-view v-slot="{ Component }">
          <transition appear enter-active-class="animate__animated animate__slideInUp">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ISMobile } from '@/stores'
</script>

<style scoped lang="scss">
@media not all and (min-width: 640px) {
  .menu {
    @apply absolute w-2/5;
  }
}
</style>
