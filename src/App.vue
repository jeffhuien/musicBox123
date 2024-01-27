<template>
  <suspense>
    <div class="flex flex-col w-full h-full">
      <div class="h-20 max-sm:h-14 flex justify-center items-center">
        <top />
      </div>
      <div class="flex-1 overflow-hidden">
        <router-view v-slot="{ Component }">
          <transition appear enter-active-class="animate__animated animate__slideInUp">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </div>
      <div class="">
        <play-bar />
      </div>
    </div>
  </suspense>
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
import { SearchSongs } from '#/search/searchSongs'
import { SearchApi } from '@/Api/search'
import router from '@/router'

let searchData = ref<SearchSongs>()
let currentRoute = useRouter().currentRoute.value
let searchKeyWords = ref<string>(currentRoute.query.keywords as string)

provide('searchKeyWords', searchKeyWords)
provide('searchData', searchData)

watch(searchKeyWords, async (newVal, v) => {
  console.log('vvv', newVal)
  searchData.value = await SearchApi.SearchSongs(newVal)
  console.log(searchData)
  router.push(`/search?keywords=${newVal}`)
})

onMounted(() => {
  console.log('加载缓存...')
  router.push({ name: 'recommend' })
})
</script>
