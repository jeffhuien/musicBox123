<script setup lang="ts">
const props = defineProps<{
  playAll?: Function
  collect?: Function
}>()
</script>

<template>
  <div class="">
    <el-button :type="'primary'" class="!bg-pink-300" @click="props?.playAll">
      <i class="fa-solid fa-play mr-2"></i>播放全部
    </el-button>

    <el-button :type="'primary'" class="!bg-red-400" @click="props?.collect">
      <i class="fa-solid fa-heart mr-2"></i>收藏
    </el-button>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-button--primary) {
  @apply bg-slate-300 rounded-2xl border-none;
}
</style>
