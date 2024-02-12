<script setup lang="ts">
import { RecommendListType, banner } from '#/index'
import { CommonApi } from '@/Api/Common'

const banner = ref<banner>()
banner.value = await CommonApi.getIndexInfo()

const list = ref<RecommendListType>()
list.value = await CommonApi.getLists()
</script>

<template>
  <el-scrollbar class="h-full p-2">
    <div class="swiper max-sm:hidden p-3">
      <el-carousel type="card" height="200px" :autoplay="true" :interval="2000" :indicator-position="''">
        <el-carousel-item v-for="(item, index) in banner?.banners" :key="index">
          <div class="relative w-full h-full">
            <el-image :src="item.imageUrl" fit="contain" class="rounded-lg h-full" />
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="list">
      <h1 class="opacity-80 font-bold mb-2">
        今日推荐
        <!-- {{ list?.result[0] }} -->
      </h1>

      <div class="grid grid-cols-6 gap-3 max-xl:grid-cols-5 max-sm:grid-cols-3">
        <el-card
          class="w-42 !border-none !shadow-none relative group transition-all"
          v-for="(i, d) in list?.result"
          :body-class="'!p-0 '"
          :index="d">
          <div
            class=""
            @click="
              $router.push({
                path: '/list/' + i.id?.toString(),
              })
            ">
            <div class="relative flex justify-center items-center">
              <img class="w-42 !rounded-lg" :src="i.picUrl" />
              <i class="fa-regular fa-play-circle text-5xl text-white absolute hidden group-hover:block" />
            </div>
            <div class="relative py-2">
              <span class="text-sm line-clamp-2 overflow-hidden hover:text-sky-500 hover:cursor-pointer">{{
                i.name
              }}</span>
              <span
                class="text-xs absolute -top-6 right-2 text-white bg-black bg-opacity-50 px-2 py-[2px] rounded-full">
                <i class="fa-solid fa-play text-white mr-[2px]"> </i>
                {{ (i.playCount / 10000).toFixed(2) }}万</span
              >
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </el-scrollbar>
</template>

<style scoped lang="scss"></style>
