<template>
  <div class="flex w-full h-full flex-col flex-wrap">
    <div class="flex justify-center p-3">
      <input type="text" v-model="uid" class="px-4 py-1 rounded-2xl border" placeholder="搜索用户id" />
      <button class="ml-2 px-4 py-1 rounded-2xl" @click="get(uid)">搜索</button>
    </div>
    <div class="text-sm">
      <div class="py-2 mb-5" v-if="queryUserList().userList.length != 0">
        <h2 class="mb-2 text-xs opacity-50">搜索历史</h2>
        <div class="flex flex-wrap gap-3">
          <span
            v-for="i in queryUserList().userList"
            @click="get(i.id)"
            class="text-xs border border-sky-500 bg-white px-3 py-1 rounded-2xl">
            {{ i.ls[0].name.replace('喜欢的音乐', '') }}
            <i @click.stop="queryUserList().remove(i.id)" class="ml-2 fa-solid fa-xmark opacity-60"></i>
          </span>
        </div>
      </div>

      <div class="text-xs flex gap-3 flex-wrap w-full md:justify-between pr-5 border-b">
        <div class="mb-2" v-for="(i, index) in userLists?.playlist" :index="index" @click="getListSongs(i.id)">
          <span class="relative text-xs border mb-3 border-sky-500 bg-white px-3 py-1 rounded-md">
            {{ i.name }}
            <span
              class="absolute rounded-full bg-red-500 w-6 h-6 scale-75 flex justify-center items-center -top-3 text-white -right-2">
              {{ i.trackCount }}
            </span>
          </span>
        </div>
      </div>
    </div>
    <div class="flex-1 !overflow-hidden bg-sky-700" v-if="listsSongs">
      <list class="h-full" :lists-songs="(listsSongs?.songs as unknown  as Song[])"></list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ListSongs } from '#/List/ListSongs'
import { UserList } from '#/List/userList'
import { ListApi } from '@/Api/List'
import { queryUserList } from '@/stores'
import { Song } from '#/song/songInfo'

let uid = ref()
let userLists = ref<UserList>()
let listsSongs = ref<ListSongs>()
provide('songs', listsSongs)

async function get(id: string) {
  if (id) {
    userLists.value = await ListApi.getList(id)
    queryUserList().add(id, userLists.value)
    queryUserList().cur = 0
  }
}

async function getListSongs(id: number) {
  listsSongs.value = await ListApi.getListSongs(id)
  queryUserList().update(id.toString(), listsSongs.value)
}
</script>
<style scoped lang="scss">
:deep(.el-table td.el-table__cell),
:deep(.el-table th.el-table__cell.is-leaf) {
  border: none;
}
</style>
