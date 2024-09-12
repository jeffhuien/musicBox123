<script setup lang="ts">
import { formatTime } from '@/utils'
import { useRouter } from 'vue-router'
import { computed, defineProps } from 'vue'

const props = defineProps<{
  id: number
  img: string
  name: string
  singer?: string
  count?: number
  to: string
  duration?: number
  typ?: number // 1: 方形，2: 矩形
}>()

const router = useRouter()
const isRectangle = computed(() => props.typ === 2)

function handleClick() {
  router.push(`/${props.to}/${props.id}`)
}
</script>

<template>
  <div
    class="w-full m-auto relative group transition-transform hover:-translate-y-2 duration-500 hover:text-sky-500 hover:cursor-pointer">
    <div class="dark:bg-gray-800" @click="handleClick">
      <div
        class="relative flex justify-center w-full h-full items-center flex-1 shrink-0">
        <img
          :class="[{ '!h-32': isRectangle }]"
          :src="`${props.img}?param=${isRectangle ? '400y200' : '400y400'}`"
          class="w-full h-full object-cover rounded-md shadow-md"
          alt="Image" />
        <i
          class="fa-regular text-white fa-play-circle text-5xl absolute hidden group-hover:block"></i>
        <div
          v-if="props.count"
          :class="[{ '-top-0 bg-no [&>span]:text-md': isRectangle }]"
          class="text-md font-bold max-sm:scale-[70%] bg-black bg-opacity-50 absolute text-white top-2 right-1 rounded-full px-2 pr-0">
          <i class="fa-solid fa-play mr-[2px]"></i>
          <span v-if="props.count < 1000000000">
            {{ (props.count / 10000).toFixed(2) }}万
          </span>
          <span v-else> {{ (props.count / 1000000000).toFixed(2) }}亿 </span>
        </div>
        <div
          class="text-xs max-sm:scale-[70%] bg-black bg-opacity-50 absolute bottom-1 text-white right-1 rounded-full px-2"
          v-if="props.duration && isRectangle">
          <span>{{ formatTime(props.duration, 'ms') }}</span>
        </div>
      </div>

      <div class="relative py-2 text-white">
        <div class="text-sm max-sm:text-xs overflow-hidden group-hover:text-sky-500">
          <div class="text-black/80 truncate dark:text-white">
            {{ props.name }}
          </div>
          <div class="text-black/60 truncate dark:text-gray-500 text-xs">
            {{ props.singer }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
