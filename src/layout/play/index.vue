<script setup lang="ts">
import { Song } from '#/song/songInfo'
import { playControl, playList } from '@/stores'
const { BarPlay } = playControl()
let closeV = ref(false)
</script>

<template>
  <div class="flex flex-col w-full h-full overflow-hidden">
    <div class="flex-1 overflow-hidden flex">
      <div class="shrink-0 transition-all duration-700 max-sm:hidden" :class="[closeV ? 'w-0' : 'w-80']">
        <div class="w-full h-full flex flex-col gap-1 z-50 rounded-md shadow-lg relative">
          <div class="flex-1 overflow-hidden" v-if="playList().playList1">
            <el-scrollbar height="100%" ref="scrollbar">
              <div
                class="w-full flex items-center justify-between p-1 px-4 rounded-sm hover:bg-gray-200 dark:hover:bg-gray-700"
                v-for="(i, index) in playList().playList1">
                <p
                  @click="BarPlay(i as unknown as Song, index)"
                  :index="index"
                  :class="[
                    index == playList().playIndex ? 'text-sky-500 opacity-100 ' : '',
                    // i.fee == 0 && !playList().isCloud ? 'text-gray-400' : '',
                  ]"
                  class="flex-1 truncate">
                  <span class="text-sm"> {{ i.name }} </span>
                  <span class="text-xs text-gray-400"> - {{ i.singerName }}</span>
                </p>
                <div class="shrink-0" v-if="!playList().isCloud">
                  <span v-if="i.fee === 1">
                    <Tag :type="'vip'" />
                  </span>
                  <!-- <span v-if="i.fee === 0">
                    <tags :type="'notSource'" />
                  </span> -->
                </div>
                <span class="float-right text-xs text-gray-400">
                  {{ i.time }}
                </span>
              </div>
            </el-scrollbar>
          </div>
          <div class="w-full h-full flex justify-center items-center static text-sm text-gray-400" v-else>
            列表内没有音乐哦
          </div>
          <i
            class="fa-solid absolute top-1/2 left-full py-3 px-1 rounded-e-md bg-black bg-opacity-40 text-white z-50 text-sm -translate-y-1"
            :class="[closeV ? 'fa-angle-right' : 'fa-angle-left']"
            @click="closeV = !closeV"></i>
        </div>
      </div>
      <div class="flex-1">
        <lyricView />
      </div>
    </div>
    <div class="">
      <PlayBar />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
