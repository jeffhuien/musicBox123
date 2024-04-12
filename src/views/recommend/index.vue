<script setup lang="ts">
import { bannerType } from '#/index'
import { CommonApi } from '@/Api/Common'
import { playControl } from '@/stores'
const { playMusicById } = playControl()

const banner = ref<bannerType>()
const list = ref<any>()
const newSongs = ref<any>()
const loading = computed(() => list.value?.playlists.length <= 1)
const page = reactive({
  limit: 15,
})
async function change(e: Event) {
  const target = e.target as HTMLInputElement
  target.classList.add('animate-spin')
  let t = list.value?.playlists[page.limit - 1]?.updateTime ?? ''
  list.value = await CommonApi.getHighQualityList(t, page.limit)
  target.classList.remove('animate-spin')
}

onBeforeMount(async () => {
  banner.value = await CommonApi.getBannerImg()
  list.value = await CommonApi.getHighQualityList('', page.limit)
  newSongs.value = await CommonApi.getNEWSong()
})
</script>

<template>
  <el-scrollbar class="h-full p-2">
    <div class="swiper max-sm:hidden p-3">
      <el-carousel type="card" height="200px" :autoplay="true" :interval="2000">
        <el-carousel-item v-for="(item, index) in banner?.banners" :key="index">
          <div class="relative w-full h-full">
            <el-image :src="item.imageUrl" fit="contain" class="rounded-lg h-full" />
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="list">
      <h1 class="opacity-80 font-bold mb-2 flex justify-between text-sky-400">
        今日推荐歌单
        <span class="">
          <i class="fa-solid fa-refresh" @click="change($event)"></i>
          <span class="text-xs"> 换一批 </span>
        </span>
      </h1>
      <el-skeleton
        class="w-full h-full flex gap-3 flex-wrap justify-between"
        :loading="loading"
        animated
        :count="10">
        <template #default>
          <div
            class="grid items-center justify-center xl:grid-cols-5 md:grid-cols-5 max-md:grid-cols-4 gap-3 max-xl:grid-cols-5 max-sm:grid-cols-3">
            <el-card
              class="w-2/3 m-auto !border-none !shadow-none relative group transition-all !bg-no hover:-translate-y-4"
              v-for="(i, d) in list?.playlists"
              :body-class="'!p-0 '"
              :index="d">
              <div
                class="dark:bg-gray-800 bg-white dark:text-white"
                @click="$router.push('/list/' + i.id?.toString())">
                <div class="relative flex justify-center items-center">
                  <el-image lazy class="w-42 h-42 !rounded-lg" :src="i.coverImgUrl" />
                  <i
                    class="fa-regular fa-play-circle text-5xl text-white absolute hidden group-hover:block" />
                </div>
                <div class="relative py-2">
                  <!-- text-xs w-full max-sm:scale-75 max-sm:w-full max-sm:px-1 max-sm:-right-2 -top-6 right-2 text-white bg-black  py-[2px] rounded-full -->
                  <div
                    class="text-xs text-white max-sm:scale-[70%] bg-black bg-opacity-50 absolute -top-6 right-0 rounded-full px-2">
                    <i class="fa-solid fa-play text-white mr-[2px]"></i>
                    <span v-if="i.playCount < 1000000000">
                      {{ (i.playCount / 10000).toFixed(2) }}万
                    </span>
                    <span v-else> {{ (i.playCount / 1000000000).toFixed(2) }}亿 </span>
                  </div>
                  <div
                    class="text-sm max-sm:text-xs line-clamp-2 overflow-hidden hover:text-sky-500 hover:cursor-pointer">
                    {{ i.name }}
                  </div>
                </div>
              </div>
            </el-card>
          </div>
          <!-- <Loading v-else class="">loading</Loading> -->
        </template>

        <template #template>
          <div class="h-40 w-1/6 flex flex-col gap-1">
            <el-skeleton-item variant="image" style="height: 80%" />
            <el-skeleton-item variant="text" style="height: 10px" />
            <el-skeleton-item variant="text" style="height: 10px; width: 30%" />
          </div>
        </template>
      </el-skeleton>
    </div>

    <div class="songs">
      <h1 class="opacity-80 font-bold mb-2 flex justify-between text-sky-400">
        新歌速递
        <span class="">
          <i class="fa-solid fa-refresh" @click="change($event)"></i>
          <span class="text-xs"> 换一批 </span>
        </span>
      </h1>
      <el-skeleton
        class="w-full h-full flex gap-3 flex-wrap justify-between"
        :loading="loading"
        animated
        :count="10">
        <template #default>
          <div
            class="grid xl:grid-cols-5 md:grid-cols-3 max-md:grid-cols-2 gap-3 max-xl:grid-cols-5 max-sm:grid-cols-2">
            <div
              class="flex items-center gap-2"
              v-for="(i, index) in newSongs?.result"
              @click="playMusicById(i.id)"
              :index="index">
              <el-image lazy class="w-12 h-12 shrink-0 !rounded-lg" :src="i.picUrl" />
              <div class="flex flex-col overflow-hidden">
                <span class="text-sm">
                  {{ i.name }}
                </span>
                <span class="text-xs opacity-60 line-clamp-1"
                  >{{ i.song.artists.map((item: any) => item.name).join('、') }}
                </span>
              </div>
            </div>
          </div>
          <!-- <Loading v-else class="">loading</Loading> -->
        </template>

        <template #template>
          <div class="h-40 w-1/6 flex flex-col gap-1">
            <el-skeleton-item variant="image" style="height: 80%" />
            <el-skeleton-item variant="text" style="height: 10px; width: 30%" />
          </div>
        </template>
      </el-skeleton>
    </div>
  </el-scrollbar>
</template>

<style scoped lang="scss"></style>
