<template>
  <suspense>
    <div class="flex flex-col w-full h-full relative">
      <div class="h-20 max-sm:h-14 flex justify-center items-center">
        <top />
      </div>
      <div class="flex-1 overflow-hidden">
        <router-view v-slot="{ Component }">
          <!-- <transition
            appear
            :enter-active-class="
              $route.meta.enter ? 'animate__animated ' + $route.meta.enter : 'animate__animated animate__fadeIn'
            "> -->
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
          <!-- </transition> -->
        </router-view>
      </div>
      <div class="relative">
        <play-bar />
      </div>
    </div>
  </suspense>
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
onMounted(() => {
  console.log('加载缓存...')
})
</script>
