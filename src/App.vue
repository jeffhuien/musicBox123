<template>
  <suspense>
    <div class="flex flex-col w-full h-full relative">
      <div class="h-20 max-sm:h-14 flex justify-center items-center">
        <i class="fa-solid fa-square-caret-left box" @click.stop="a(false)"></i>
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

<style lang="scss" scoped>
.box {
  @apply md:hidden text-gray-500;
  @apply text-3xl z-50;
}
</style>

<script setup lang="ts">
import { SearchSongs } from '#/search/searchSongs'
import { SearchApi } from '@/Api/search'
import router from '@/router'
import { main } from '@/stores'

let searchData = ref<SearchSongs>()
let currentRoute = useRouter().currentRoute.value
let searchKeyWords = ref<string>(currentRoute.query.keywords as string)
let { menuClose } = toRefs(main())
provide('searchKeyWords', searchKeyWords)
provide('searchData', searchData)

watch(searchKeyWords, async (newVal, v) => {
  searchData.value = await SearchApi.SearchSongs(newVal)
  router.push(`/search?keywords=${newVal}`)
})

onMounted(() => {
  console.log('加载缓存...')
})

function a(q: boolean = false) {
  const menu = document.querySelector('.menu') as HTMLElement
  const box = document.querySelector('.box') as HTMLElement
  menu.classList.remove('max-md:hidden')
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
