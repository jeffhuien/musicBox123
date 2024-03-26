<script setup lang="ts">
import { ref, onMounted } from 'vue'

let a = ref<HTMLElement>()

onMounted(() => {
  console.log(a.value)
  a.value?.addEventListener('keydown', (e) => {
    console.log(e.key)
    e.preventDefault()
  })
})
</script>

<template>
  <div tabindex="1" ref="a" class="focus:outline-none h-screen w-1/2 bg-gray-700 overflow-y-scroll">
    <div class="" v-for="i in 100">1234</div>
  </div>
</template>

<style scoped lang="scss"></style>
