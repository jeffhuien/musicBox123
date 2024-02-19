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
        <div class="relative group w-full h-full flex justify-center items-center">
          <span @click="item.fun?.click" @blur="item.fun?.blur">
            <i class="fa-solid" :class="[playControl().isMuted ? item.ico[1] : item.ico[0]]"></i>
            <span class="ml-1 max-sm:hidden" :ref="item.id">{{ item.name }}</span>
          </span>

          <div
            class="hidden -translate-x-1/2 py-3 left-1/2 group-hover:flex flex-col justify-center gap-2 shadow-xl rounded-xl items-center border w-14 h-32 bg-white z-20 absolute bottom-10">
            <div class="flex-1">
              <ElSlider
                v-model="playControl().volume"
                :disabled="playControl().isMuted"
                :vertical="true"
                :show-tooltip="false"
                :min="0"
                :step="0.01"
                :max="1" />
            </div>
            <span class="text-xs">{{ playControl().isMuted ? 0 : (playControl().volume * 100).toFixed(0) }}%</span>
          </div>
        </div>
      </template>

      <template v-else>
        <span @click="item.fun?.click" @blur="item.fun?.blur">
          <i :class="[item.ico instanceof Array ? item.ico[0] : item.ico]"></i>
          <span class="ml-1 max-sm:hidden" :ref="item.id">{{ item.name }}</span>
        </span>
      </template>
    </template>
  </div>
</template>
<style scoped lang="scss">
span {
  @apply relative;

  span {
    @apply duration-700 ease-in absolute top-5 -left-1 w-12 bg-white border opacity-0;
  }

  &:hover span {
    opacity: 1;
  }
}
</style>
