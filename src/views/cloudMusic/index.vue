<script setup lang="ts">
import { AuthApi } from '@/Api/Auth'

let data = await AuthApi.getCloud(2, 1)
console.log(data.data)
</script>

<template>
  <div class="">1234</div>
</template>

<style scoped lang="scss"></style>
