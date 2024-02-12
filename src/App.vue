<template>
  <suspense>
    <div class="flex flex-col w-full h-full relative">
      <div class="h-20 max-sm:h-14 flex justify-center items-center">
        <i
          class="transition-all fa-solid fa-square-caret-left box md:hidden text-fuchsia-400 text-3xl z-50;"
          @click.stop="a(false)"></i>
        <top />
      </div>
      <div class="flex-1 overflow-hidden" @click="a(true)">
        <router-view v-slot="{ Component }">
          <!-- <transition appear enter-active-class="animate__animated animate__slideInUp"> -->
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
import { main } from '@/stores'
let { menuClose } = toRefs(main())
onBeforeMount(() => {
  if (main().menuClose && !main().isMobile) {
    main().menuClose = false
  }
})

onMounted(() => {
  console.log('加载缓存...')
})
function a(q: boolean = false) {
  const menu = document.querySelector('.menu') as HTMLElement
  const box = document.querySelector('.box') as HTMLElement
  menu?.classList.remove('max-md:hidden')
  if (menu == undefined) {
    return
  }
  if (q) {
    if (menuClose.value === true) return

    menu.classList.add('animate__slideOutLeft')
    box.classList.toggle('fa-square-caret-left')
    box.classList.toggle('fa-square-caret-right')
    menuClose.value = true
  } else {
    menu.classList.toggle('animate__slideInLeft')
    menu.classList.toggle('animate__slideOutLeft')
    box.classList.toggle('fa-square-caret-right')
    box.classList.toggle('fa-square-caret-left')
    menuClose.value = !menuClose.value
  }
}
</script>
