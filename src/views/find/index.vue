<template>
  <div class="flex w-full h-full flex-col flex-wrap">
    <div class="flex justify-center p-3">
      <input
        type="text"
        v-model="uid"
        class="px-4 py-1 rounded-2xl border outline-none dark:bg-gray-800"
        placeholder="搜索用户id" />
      <button class="ml-2 px-4 py-1 rounded-2xl" @click="get(uid)">搜索</button>
    </div>
    <div
      class="scrollbar-hidden p-2 text-sm border-b border-b-gray-700 h-1/3 overflow-y-scroll overflow-x-hidden w-full">
      <div class="py-2 mb-5 border-b dark:border-b-gray-600">
        <h2 class="mb-2 text-xs opacity-50">搜索历史</h2>
        <div class="flex flex-wrap gap-3">
          <span
            v-for="i in UserList().user"
            @click="get(i.id)"
            class="text-xs border border-sky-500 bg-white dark:bg-gray-800 px-3 py-1 rounded-2xl">
            {{ i.list[0].name.replace('喜欢的音乐', '') }}
            <i @click.stop="removeUser(i.id)" class="ml-2 fa-solid fa-xmark opacity-60"></i>
          </span>
        </div>
      </div>
      <div class="w-full text-xs flex gap-4 flex-wrap md:justify-between dark:border-gray-600">
        <div
          class="w-1/6"
          v-for="(i, index) in userLists?.playlist"
          :index="index"
          @click="getListSongs(i.id.toString())">
          <div
            class="relative w-full text-xs border flex items-center gap-2 p-1 border-sky-500 bg-white dark:bg-gray-800 rounded-md">
            <img :src="i.coverImgUrl" class="size-8" alt="" />
            <span class="truncate w-full">
              {{ i.name }}
            </span>
            <div
              class="absolute rounded-full bg-red-500 dark:bg-gray-500 w-6 h-6 scale-75 flex justify-center items-center -top-3 text-white -right-2">
              {{ i.trackCount }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-1 !overflow-hidden" v-if="listsSongs">
      <list class="h-full" :lists-songs="(listsSongs?.songs as unknown  as Song[])"></list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ListSongs } from '#/List/ListSongs'
import { UserListReqType } from '#/List/userList'
import { ListApi } from '@/Api/List'
import { UserList } from '@/stores'
import { Song } from '#/song/songInfo'
import { UserListType } from '#/index'

let uid = ref()
let userLists = ref<UserListReqType>()
let listsSongs = ref<ListSongs>()
const { addUser, removeUser } = UserList()

async function get(id: string) {
  if (id) {
    userLists.value = await ListApi.getList(id)
    let t = userLists.value.playlist.map((I: any) => {
      return { name: I.name, id: I.id.toString(), img: I.coverImgUrl, count: I.trackCount } as UserListType
    })
    addUser({ id, list: t })
  }
}

async function getListSongs(id: string) {
  listsSongs.value = await ListApi.getListSongs(id)
}
</script>
<style scoped lang="scss">
:deep(.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell) {
  background-color: #ffffff00 !important;
}
</style>
