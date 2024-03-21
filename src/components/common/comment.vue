<script setup lang="ts">
import { CommentType } from '#/Comment'
import { Song } from '#/song/songInfo'
import { CommonApi } from '@/Api'

import loading from '../Loading/loading.vue'
import songListView from '../list/songListView.vue'
import { CommentApi } from '@/Api/Comment'
import { SongListComment } from '#/Comment/SongListComment'
import { MusicComment } from '#/Comment/MusicComment'
songListView
const props = defineProps<{
  info?: {
    type: Song
  }
  id: string
}>()
let dada = ref<MusicComment>()

dada.value = await CommentApi.getSongComment(props.id)

// function update(id: string) {}

let input = ref('0')
</script>

<template>
  <div class="md:p-4 w-full h-full flex flex-col overflow-y-scroll" v-if="props.id">
    <div class="info flex">
      <ElImage :src="''"></ElImage>
      <div class="">
        <div class="name"></div>
        <div class="">
          <p></p>
          <p></p>
        </div>
      </div>
    </div>
    <div class="input">
      <span class="relative"
        >全部评论
        <span class="absolute text-xs -top-1">{{ 98576 }}</span>
      </span>
      <div class="max-sm:hidden">
        <textarea
          name=""
          id=""
          class="w-full rounded-xl text-sm bg-gray-100 dark:bg-gray-700 p-3 outline-none"
          placeholder="发表你精彩的言论吧~"
          rows="4 "></textarea>
      </div>
    </div>
    <div class="content">
      <h1>精彩评论</h1>
      <div class="">
        <div
          class="flex w-full gap-4 mb-2 items-center p-3 border-b border-b-gray-50 border-opacity-10"
          v-for="(i, index) in dada?.comments">
          <ElAvatar :src="i.user.avatarUrl" :size="'default'" class=""></ElAvatar>
          <div class="flex-1 flex-grow-2 flex flex-col gap-2">
            <p class="text-xs dark:text-gray-600 text-gray-500">{{ i.user.nickname }}</p>
            <p class="flex-1 line-clamp-2 text-sm">{{ i.content }}</p>
          </div>
          <p class="self-end float-right text-xs">{{ i.timeStr }}</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <loading> 加载中... </loading>
  </div>
</template>

<style scoped lang="scss"></style>
