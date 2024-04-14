<script setup lang="ts">
const props = defineProps<{
  id: number
  img: string
  content?: string
  count?: number
  to?: string
  typ?: number //1方形 2矩形
}>()

const { content, img, id, count, to } = toRefs(props)
const style = computed(() => props.typ ?? 1)
</script>

<template>
  <div
    class="w-full m-auto relative group transition-transform hover:-translate-y-2 duration-500 hover:text-sky-500 hover:cursor-pointer">
    <div class="dark:bg-gray-800 dark:" @click="$router.push(`/${to}/${id}`)">
      <div
        class="relative flex justify-center w-full h-full items-center flex-1 shrink-0">
        <img
          :class="[style == 2 ? '!h-32' : '']"
          :src="`${img}?param=${style == 2 ? '200y150' : '200y200'}`"
          class="w-full h-full object-cover rounded-md"
          alt="" />
        <i
          class="fa-regular text-white fa-play-circle text-5xl absolute hidden group-hover:block" />
      </div>

      <div class="relative py-2 text-white">
        <div
          v-if="count"
          class="text-xs max-sm:scale-[70%] bg-black bg-opacity-50 absolute -top-6 right-0 rounded-full px-2">
          <i class="fa-solid fa-play mr-[2px]"></i>
          <span v-if="count < 1000000000"> {{ (count / 10000).toFixed(2) }}万 </span>
          <span v-else> {{ (count / 1000000000).toFixed(2) }}亿 </span>
        </div>
        <div
          class="text-sm max-sm:text-xs line-clamp-2 h-10 overflow-hidden text-black/60">
          {{ content }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
