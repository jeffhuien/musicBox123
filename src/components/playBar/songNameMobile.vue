<script setup lang="ts">
let data = defineProps(['musicName', 'singerName'])
</script>

<template>
  <div class="flex shrink-0 flex-1 bars ml-2 flex-col justify-center items-start relative !w-full">
    <span class="text-sm opacity-70 !overflow-hidden truncate w-full">{{ data.musicName }}</span>
    <span class="text-xs opacity-50 !overflow-hidden truncate w-full">{{ data.singerName }}</span>
  </div>
</template>

<style scoped lang="scss"></style>
