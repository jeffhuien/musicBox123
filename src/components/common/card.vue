<script setup lang="ts">
import { formatTime } from '@/utils'

const props = defineProps<{
  id: number
  img: string
  name: string
  singer?: string
  count?: number
  to?: string
  duration?: number
  typ?: number //1方形 2矩形
}>()

const { name, singer, img, id, count, to, duration } = toRefs(props)
const style = computed(() => props.typ ?? 1)
</script>

<template>
  <div
    class="w-full m-auto relative group transition-transform hover:-translate-y-2 duration-500 hover:text-sky-500 hover:cursor-pointer">
    <div class="dark:bg-gray-800" @click="$router.push(`/${to}/${id}`)">
      <div
        class="relative flex justify-center w-full h-full items-center flex-1 shrink-0">
        <img
          :class="[style == 2 ? '!h-32' : '']"
          :src="`${img}?param=${style == 2 ? '400y200' : '400y400'}`"
          class="w-full h-full object-cover rounded-md shadow-md"
          alt="" />
        <i
          class="fa-regular text-white fa-play-circle text-5xl absolute hidden group-hover:block" />
        <div
          v-if="count"
          :class="[style == 2 ? '-top-0 bg-no [&>span]:text-md' : '']"
          class="text-md font-bold max-sm:scale-[70%] bg-black bg-opacity-50 absolute text-white top-2 right-1 rounded-full px-2 pr-0">
          <i class="fa-solid fa-play mr-[2px]"></i>
          <span v-if="count < 1000000000"> {{ (count / 10000).toFixed(2) }}万 </span>
          <span v-else> {{ (count / 1000000000).toFixed(2) }}亿 </span>
        </div>
        <div
          class="text-xs max-sm:scale-[70%] bg-black bg-opacity-50 absolute bottom-1 text-white right-1 rounded-full px-2"
          v-if="duration && style == 2">
          <span>{{ formatTime(duration, 'ms') }}</span>
        </div>
      </div>

      <div class="relative py-2 text-white">
        <div class="text-sm max-sm:text-xs overflow-hidden group-hover:text-sky-500">
          <div class="text-black/80 truncate dark:text-white">
            {{ name }}
          </div>
          <div class="text-black/60 truncate dark:text-gray-500 text-xs">
            {{ singer }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
