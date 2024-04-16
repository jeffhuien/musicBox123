<script setup lang="ts">
import { bars } from '#/index'
import { playControl, playList } from '@/stores'

let data = defineProps<{
  data: bars[]
}>()
</script>

<template>
  <div class="flex gap-6 h-full items-center [&_button]:w-8">
    <slot />

    <template v-for="(item, index) in data.data" :key="index">
      <!-- // -->
      <template v-if="item.name == '音量'">
        <div
          class="relative max-md:hidden group w-full h-full flex justify-center items-center">
          <button @click="item.data.fun?.click" @blur="item.data.fun?.blur">
            <i
              class="fa-solid w-5 shrink-0"
              :class="[
                playControl().isMuted || playControl().volume == 0
                  ? item.data.ico[1]
                  : item.data.ico[0],
              ]"></i>
          </button>

          <div
            class="hidden -translate-x-1/2 py-3 left-1/2 group-hover:flex flex-col justify-center gap-2 shadow-xl rounded-md items-center border w-14 !h-32 bg-white dark:bg-gray-800 dark:border-gray-600 z-20 absolute bottom-10">
            <div class="flex-1">
              <ElSlider
                class="!h-full"
                v-model="playControl().volume"
                :disabled="playControl().isMuted"
                :vertical="true"
                :show-tooltip="false"
                :min="0"
                :step="0.01"
                :max="1" />
            </div>
            <span class="text-xs dark:text-gray-400"
              >{{
                playControl().isMuted ? 0 : (playControl().volume * 100).toFixed(0)
              }}%</span
            >
          </div>
        </div>
      </template>

      <template v-else-if="item.name == '模式'">
        <div
          class="relative max-md:hidden group w-full h-full flex justify-center items-center">
          <button @click="item.data.fun?.click" @blur="item.data.fun?.blur">
            <i
              v-if="playList().playMode != 'SingleLoop'"
              class="fa-solid w-5 shrink-0"
              :class="[
                playList().playMode != 'Loop' ? item.data.ico[1] : item.data.ico[0],
              ]"></i>
            <img src="/img/ico/repeat-1.svg" class="m-auto w-5 shrink-0" v-else alt="" />
          </button>

          <div
            class="-translate-x-1/2 py-3 left-1/2 group-hover:flex hidden flex-col justify-between gap-2 shadow-xl rounded-md items-center border w-24 !h-32 bg-white dark:bg-gray-800 dark:border-gray-600 z-20 absolute bottom-10">
            <div class="flex-1 flex flex-col items-center gap-3 justify-between">
              <div
                :class="[playList().playMode == 'Loop' ? 'active' : '']"
                class="flex items-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-700 p-1 rounded-md"
                @click="playList().playMode = 'Loop'">
                <i class="fa-solid" :class="item.data.ico[0]"></i>
                <span>循环播放</span>
              </div>

              <div
                :class="playList().playMode == 'Random' ? 'active' : ''"
                class="flex items-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-700 p-1 rounded-md"
                @click="playList().playMode = 'Random'">
                <i class="fa-solid" :class="item.data.ico[1]"></i>
                <span>随机播放</span>
              </div>
              <div
                :class="playList().playMode == 'SingleLoop' ? 'active' : ''"
                class="flex items-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-700 p-1 rounded-md"
                @click="playList().playMode = 'SingleLoop'">
                <img src="/img/ico/repeat-1.svg" class="w-4" alt="" />
                <span>单曲循环</span>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <div
          class="relative group w-5 shrink-0 h-full flex justify-center items-center"
          :class="[item.name != '列表' ? 'max-md:hidden' : '']">
          <button
            class="relative"
            @blur.native.capture="item.data.fun?.blur"
            @click="item.data.fun?.click">
            <i
              class=""
              :class="[
                item.data.ico instanceof Array ? item.data.ico[0] : item.data.ico,
              ]">
            </i>
          </button>
        </div>
      </template>
    </template>
  </div>
</template>
<style scoped lang="scss">
button {
  @apply relative;

  span {
    @apply duration-700 ease-in absolute top-5 -left-1 w-12 bg-white border opacity-0;
  }

  &:hover span {
    opacity: 1;
  }
}
.active {
  @apply dark:bg-gray-700 bg-sky-400 text-white;
}
</style>
