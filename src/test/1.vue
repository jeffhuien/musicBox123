<script setup lang="ts">
import { CommonApi, SongApi } from '@/Api'
import { auth } from '@/stores'
let uid = auth().user?.data.profile.userId.toString()!
let res = await CommonApi.likelist(uid)
</script>

<template>
  <div class="">
    {{ res }}
  </div>
</template>

<style scoped lang="scss"></style>
