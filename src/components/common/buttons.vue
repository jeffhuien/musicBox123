<script setup lang="ts">
const props = defineProps<{
  Collect?: {
    isCollect: boolean
  }
  Upload?: boolean
  Download?: boolean
}>()

const emit = defineEmits<{
  (e: 'collect', t: number): void
  (e: 'playAll'): void
  (e: 'upload'): void
  (e: 'download'): void
  (e: 'search', w: string): void
  (e: 'sort', t: string): void
}>()

let f = ref<1 | 2>(props?.Collect ? 2 : 1)
let searchValue = ref<string>('')
</script>

<template>
  <div class="flex justify-between items-center w-full text-gray-500">
    <div class="">
      <el-button :type="'primary'" class="!bg-pink-400" @click="$emit('playAll')">
        <i class="fa-solid fa-play mr-2"></i>
        播放全部
      </el-button>
      <el-button
        v-if="props.Collect"
        :type="'primary'"
        class="!bg-red-500"
        @click="$emit('collect', f), (f = f == 1 ? 2 : 1)">
        <i class="fa-solid fa-heart mr-2"></i>
        <span v-if="!props?.Collect || f == 1"> 收藏 </span>
        <span v-else> 取消收藏 </span>
      </el-button>

      <el-button v-if="props.Upload" :type="'primary'" class="!bg-blue-500" @click="$emit('upload')">
        <i class="fa-solid fa-cloud-arrow-up mr-2"></i>
        上传
      </el-button>
    </div>
    <div class="text-right flex items-center gap-x-3">
      <div class="relative input">
        <input
          type="text"
          placeholder="搜索"
          @input="$emit('search', searchValue)"
          @keydown.stop=""
          v-model="searchValue"
          class="transition-all duration-700 w-20 focus:w-40 rounded-3xl border caret-pink-500 pl-4 pr-8 py-1 max-sm:py-1 text-xs text-gray-600 focus:outline-sky-200 hover:border-lime-300 outline-none" />
        <i class="fa-solid fa-magnifying-glass absolute top-[20%] right-2 opacity-50"></i>
      </div>
      <div class="sort z-20">
        <div class="text-sm group relative">
          <i class="fa-solid fa-list-squares mr-2"></i>
          <span>排序</span>
          <div
            class="absolute hidden group-hover:flex border flex-col bg-white w-32 dark:bg-gray-700 text-left px-5 right-0 rounded-md p-2">
            <p class="w-full p-2 rounded-md dark:hover:bg-gray-600 hover:bg-gray-200" @click="$emit('sort', 'default')">
              默认排序
            </p>
            <p class="w-full p-2 rounded-md dark:hover:bg-gray-600 hover:bg-gray-200" @click="$emit('sort', 'time')">
              按时间排序
            </p>
            <p class="w-full p-2 rounded-md dark:hover:bg-gray-600 hover:bg-gray-200" @click="$emit('sort', 'name')">
              按名称排序
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-button--primary) {
  @apply bg-slate-300 rounded-2xl border-none;
}
</style>
