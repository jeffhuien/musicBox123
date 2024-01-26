<script setup lang="ts"></script>

<template>
  <div class="flex flex-col h-full w-full">
    <div class="h-full w-full grid grid-cols-4 grid-row-1" @click="$router.back">
      <div class="bg-slate-400 col-span-1">list</div>
      <div class="col-span-3 bg-yellow-300">song & lircy</div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
