<script setup lang="ts">
import { bars } from '#/types'

let data = defineProps<{
  data: bars[]
}>()
</script>

<template>
  <div class="buttons flex gap-6">
    <template v-for="(item, index) in data.data" :key="index">
      <button @click="item.fun($event)">
        <i :class="[item.ico instanceof Array ? item.ico[0] : item.ico]"></i>
        <span class="ml-1 sm:hidden">{{ item.name }}</span>
      </button>
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
