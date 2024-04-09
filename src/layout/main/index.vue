<template>
  <div class="w-full h-full">
    <suspense>
      <div class="flex flex-col w-full h-full relative">
        <div class="h-20 max-sm:h-14 flex justify-center items-center">
          <top />
        </div>
        <div class="flex-1 overflow-hidden">
          <div class="w-full h-full flex flex-col">
            <div class="flex w-full h-full gap-3 relative">
              <div
                class="bg-white dark:bg-gray-800 shrink-0 h-full transition-all w-52 duration-700 z-50"
                :class="[
                  menuClose && main().isMobile ? '!w-0' : '',
                  main().isMobile ? 'max-md:absolute ' : '',
                ]">
                <el-scrollbar
                  class="relative w-full md:min-w-[12rem] h-full shrink-0 shadow-lg rounded-xl">
                  <left-menu />
                  <song-list-menu />
                </el-scrollbar>
                <i
                  class="fa-solid absolute top-1/4 left-full py-3 px-1 rounded-e-md bg-black bg-opacity-40 text-white z-50 text-sm -translate-y-1"
                  :class="[menuClose ? 'fa-angle-right' : 'fa-angle-left']"
                  @click="menuClose = !menuClose"></i>
              </div>

              <div
                class="flex-grow overflow-hidden h-full flex-1 w-5/6 md:pr-2"
                @click="!main().isMobile ? 0 : (menuClose = true)">
                <router-view v-slot="{ Component }">
                  <transition
                    appear
                    :enter-active-class="
                      $route.meta.enter
                        ? 'animate__animated ' + $route.meta.enter
                        : 'animate__animated animate__fadeIn'
                    ">
                    <keep-alive>
                      <component :is="Component" />
                    </keep-alive>
                  </transition>
                </router-view>
              </div>
            </div>
          </div>
        </div>
        <div class="">
          <play-bar />
        </div>
      </div>
    </suspense>
  </div>
</template>

<script setup lang="ts">
import { main } from '@/stores'
const { menuClose } = toRefs(main())
</script>

<style scoped lang="scss">
.menu {
  @apply max-md:absolute max-md:w-2/5;
}
</style>
