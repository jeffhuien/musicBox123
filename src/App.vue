<template>
  <div class="w-full h-full">
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
onMounted(() => {
  console.log('加载缓存...')
})
</script>
