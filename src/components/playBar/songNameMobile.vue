<script setup lang="ts">
let data = defineProps(['musicName', 'singerName'])
</script>

<template>
  <div class="flex shrink-0 flex-1 bars ml-2 flex-col justify-center items-start max-sm:w-[30vw] relative !w-full">
    <span class="text-sm">{{ data.musicName }}</span>
    <span class="text-xs">{{ data.singerName }}</span>
  </div>
</template>

<style scoped lang="scss"></style>
