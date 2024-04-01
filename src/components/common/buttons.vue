<script setup lang="ts">
const props = defineProps<{
  playAll?: Function
  isCollect?: boolean
}>()

const emit = defineEmits<{
  (e: 'collect', t: number): void
}>()

function t(t: number) {
  emit('collect', t)
  f.value = t == 1 ? 2 : 1
}

let f = ref<1 | 2>(props?.isCollect ? 2 : 1)
</script>

<template>
  <div class="">
    <el-button :type="'primary'" class="!bg-pink-300" @click="props?.playAll">
      <i class="fa-solid fa-play mr-2"></i>播放全部
    </el-button>

    <el-button :type="'primary'" class="!bg-red-400" @click="t(f)">
      <i class="fa-solid fa-heart mr-2"></i>
      <span v-if="!props?.isCollect || f == 1"> 收藏 </span>
      <span v-else> 取消收藏 </span>
    </el-button>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-button--primary) {
  @apply bg-slate-300 rounded-2xl border-none;
}
</style>
