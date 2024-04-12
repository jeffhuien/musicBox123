<script setup lang="ts">
import { CommonApi } from '@/Api'
import { CommentApi } from '@/Api/Comment'
import { containsProp } from '@vueuse/core'

await CommonApi.getHighQualityList()
await CommonApi.getHOTList()
</script>

<template>
  <!-- TODO design NEW -->
</template>

<style scoped lang="scss"></style>
