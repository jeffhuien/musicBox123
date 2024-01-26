<template>
  <div class="text-red-300 text-xl flex justify-center items-center gap-3 mr-3">
    <i class="fa-solid fa-angle-left text-2xl hover:text-sky-400" @click="$router.back"></i>
    <i class="fa-solid fa-angle-right text-2xl hover:text-sky-400" @click="$router.go(1)"></i>
  </div>
</template>
