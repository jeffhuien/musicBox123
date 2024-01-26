<script setup lang="ts">
import { Song } from '#/List/ListSongs'
import { SearchSongs } from '#/search/searchSongs'
import { formatTime, playMusic } from '@/utils'

let searchData = inject<SearchSongs>('searchData')

if (searchData) {
  searchData.value = searchData
}
</script>

<template>
  <div class="h-full flex-col flex overflow-hidden">
    <div
      class="flex text-xs px-4 mb-3 w-full gap-3 [&_p]:px-4 [&_p]:py-1 [&_p]:bg-sky-500 [&_p]:rounded-2xl text-white">
      <p>全部</p>
      <p>单曲</p>
      <p>专辑</p>
      <p>歌词</p>
    </div>
    <div class="flex-1 overflow-hidden px-4 flex flex-col">
      <div class="sticky top-0 grid grid-cols-8 last:border-none max-sm:hidden mb-3">
        <span class="col-span-3">歌曲</span>
        <span class="col-span-2">歌手</span>
        <span class="col-span-2">专辑</span>
        <span class="col-span-1">时长</span>
      </div>
      <div class="overflow-y-scroll h-full box-border">
        <div
          class="grid grid-cols-8 max-sm:grid-cols-2 text-sm"
          @click="playMusic(i as unknown as Song)"
          v-if="searchData"
          v-for="i in searchData.result?.songs">
          <div class="col-span-3 mb-2 max-sm:col-span-1">
            <div class="">
              <span>
                {{ i.name }}
              </span>
              <span
                class="text-xs bg-yellow-600 text-white ml-3 border border-yellow-100 rounded-xl px-2"
                v-if="i.fee === 1">
                vip
              </span>
            </div>
            <div class="opacity-0 group-hover:opacity-100">一些功能。。。</div>
          </div>

          <div class="col-span-2 mb-2 max-sm:col-span-1">{{ i.ar.map((item: any) => item.name).join('、') }}</div>
          <div class="col-span-2 mb-2 max-sm:hidden">{{ i.al.name }}</div>
          <div class="col-span-1 mb-2 max-sm:hidden">{{ formatTime(i.dt, 'ms') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- <template>
  <div class="h-full">
    
    <div class="px-5 h-full">
      <table class="w-full h-full bg-red-300 text-sm text-left text-gray-500 dark:text-gray-400 overflow-hidden">
        <thead class="text-xs text-gray-700 max-md:hidden">
          <tr class="h-2">
            <th scope="col" class="py-3 px-6">歌曲</th>
            <th scope="col" class="py-3 px-6">歌手</th>
            <th scope="col" class="py-3 px-6">专辑</th>
            <th scope="col" class="py-3 px-6">时长</th>
          </tr>
        </thead>
        <tbody class="overflow-scroll !h-full bg-sky-300" v-if="searchData?.result">
          <template v-if="!getIsMobile()">
            <tr
              @click="playMusic(i as unknown as Song)"
              v-for="i in searchData.result.songs"
              class="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100">
              <td class="py-4 px-6 flex justify-between group transition-all ease-in-out">
                <div class="">
                  <span>
                    {{ i.name }}
                  </span>
                  <span
                    class="text-xs bg-yellow-600 text-white ml-3 border border-yellow-100 rounded-xl px-2"
                    v-if="i.fee === 1">
                    vip
                  </span>
                </div>
                <div class="opacity-0 group-hover:opacity-100">一些功能。。。</div>
              </td>
              <td class="py-4 px-6">{{ i.ar.map((item: any) => item.name).join('、') }}</td>
              <td class="py-4 px-6">{{ i.al.name }}</td>
              <td class="py-4 px-6">{{ formatTime(i.dt, 'ms') }}</td>
            </tr>
          </template>
          <template v-else>
            <div
              v-for="i in searchData.result.songs"
              @click="playMusic(i as unknown as Song)"
              class="pb-6 flex items-center">
              <div class="">
                <img class="w-8 h-8 object-cover rounded-md max-sm:rounded-full" :src="i.al.picUrl" />
              </div>
              <div class="ml-3 text-sm">
                <p>
                  {{ i.name }}
                  <span
                    class="text-xs text-yellow-400 ml-3 border-2 border-yellow-400 rounded-xl px-2"
                    v-if="i.fee === 1">
                    vip
                  </span>
                </p>
                <p class="text-xs">{{ i.ar.map((item: any) => item.name).join('、') }}</p>
              </div>
            </div>
          </template>
        </tbody>
        <div class="w-full h-full flex justify-center items-center" >快来搜点什么~</div>
      </table>
    </div>
  </div>
</template> -->

<style scoped lang="scss"></style>
