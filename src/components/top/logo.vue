<script setup lang="ts"></script>

<template>
  <div class="flex justify-center items-center gap-3 mr-3" @click="$router.push({ name: 'recommend' })">
    <img src="/img/car.svg" alt="" class="icon w-7 h-7 animate-spin-slow" />
    <span class="text-sm whitespace-nowrap max-sm:hidden">音乐小屋！</span>
  </div>
</template>

<style scoped lang="scss"></style>
