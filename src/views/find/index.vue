<template>
  <div class="flex w-full h-full flex-col flex-wrap">
    <div class="flex justify-center p-3">
      <input type="text" v-model="uid" class="px-4 py-1 rounded-2xl border" placeholder="搜索用户id" />
      <button class="ml-2 px-4 py-1 rounded-2xl" @click="get(uid)">搜索</button>
    </div>
    <div class="text-sm">
      <div class="py-2 mb-5" v-if="queryUserList().userList.length != 0">
        <h2 class="mb-2 text-xs opacity-50">搜索历史</h2>
        <div class="flex flex-wrap">
          <span
            v-for="i in queryUserList().userList"
            @click="get(i)"
            class="text-xs border border-sky-500 bg-white px-3 py-1 rounded-2xl">
            {{ i }}
            <i @click.stop="queryUserList().remove(i)" class="fa-solid fa-xmark opacity-60"></i>
          </span>
        </div>
      </div>

      <div class="text-xs flex gap-x-3 flex-wrap">
        <div class="flex gap-2" v-for="(i, index) in userLists?.playlist" :index="index" @click="getListSongs(i.id)">
          <span class="text-xs border mb-3 border-sky-500 bg-white px-3 py-1 rounded-md">
            {{ i.name }}
          </span>
        </div>
      </div>
    </div>
    <div class="flex-1 !overflow-hidden bg-sky-700" v-if="listsSongs">
      <list class="h-full" :lists-songs="listsSongs?.songs"></list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ListSongs } from '#/List/ListSongs'
import { UserList } from '#/List/userList'
import { ListApi } from '@/Api/List'
import { queryUserList } from '@/stores'

let uid = ref()
let userLists = ref<UserList>()
let listsSongs = ref<ListSongs>()
provide('songs', listsSongs)

async function get(id: string) {
  userLists.value = await ListApi.getList(id)
  if (id !== 'null') queryUserList().add(id)
}

async function getListSongs(id: number) {
  listsSongs.value = await ListApi.getListSongs(id)
}
</script>
<style scoped lang="scss">
:deep(.el-table td.el-table__cell),
:deep(.el-table th.el-table__cell.is-leaf) {
  border: none;
}
</style>
