<template>
  <span>{{ time }}</span>
</template>

<script setup lang="ts">
import { formatTime } from '@/utils'
import { ref, watch } from 'vue'
let time = ref('00:00/00:00')
let data = defineProps(['CurTime', 'totalTime'])
time.value = formatTime(data.CurTime) + '/' + formatTime(data.totalTime)

watch(
  () => data.CurTime,
  (n, o) => {
    time.value = formatTime(n) + '/' + formatTime(data.totalTime)
    // if (n == data.totalTime) time.value = formatTime(n) + '/' + formatTime(n)
  },
)
</script>
<style scoped lang="scss"></style>
