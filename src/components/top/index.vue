<script setup lang="ts"></script>

<template>
  <div class="flex w-full p-2 h-12 md:justify-center items-center">
    <div class="flex md:w-1/3 items-center">
      <logo class="w-32 ml-9 max-sm:mx-4 max-sm:w-12 shrink-0" />
      <back class="max-md:hidden" />
    </div>
    <div class="md:w-1/3">
      <mSearch class="" />
    </div>
    <div class="md:w-1/3 flex max-md:pl-10">
      <setting-btn class="max-md:hidden"></setting-btn>
      <Auth></Auth>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
