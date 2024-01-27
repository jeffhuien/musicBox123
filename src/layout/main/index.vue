<template>
  <div class="w-full h-full flex flex-col">
    <div class="flex w-full h-full gap-3">
      <div class="w-1/6 min-w-[12rem] h-full shrink-0 shadow-lg max-sm:hidden">
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
