<script setup lang="ts">
import { bars } from '#/index'
import { playControl } from '@/stores'

let data = defineProps<{
  data: bars[]
}>()
</script>

<template>
  <div class="flex gap-6 h-full items-center">
    <template v-for="(item, index) in data.data" :key="index">
      <template v-if="item.name == '音量'">
        <div class="relative max-md:hidden group w-full h-full flex justify-center items-center">
          <button @click="item.fun?.click" @blur="item.fun?.blur">
            <i
              class="fa-solid w-5 shrink-0"
              :class="[playControl().isMuted || playControl().volume == 0 ? item.ico[1] : item.ico[0]]"></i>
            <span class="ml-1 max-sm:hidden">{{ item.name }}</span>
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
              >{{ playControl().isMuted ? 0 : (playControl().volume * 100).toFixed(0) }}%</span
            >
          </div>
        </div>
      </template>

      <template v-else>
        <div
          class="relative group w-5 shrink-0 h-full flex justify-center items-center"
          :class="[item.name != '列表' ? 'max-md:hidden' : '']">
          <button class="relative" @blur.native.capture="item.fun?.blur" @click="item.fun?.click">
            <i class="" :class="[item.ico instanceof Array ? item.ico[0] : item.ico]"> </i>
            <!-- <em
              v-if="item.name == '评论' || item.name == '收藏'"
              class="absolute -top-1 left-1 text-pink-600 text-xs scale-75"
              >{{ '999' }}</em
            > -->
            <span class="ml-1 max-sm:hidden">{{ item.name }}</span>
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
</style>
