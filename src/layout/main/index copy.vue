<template>
  <div class="w-full h-full flex flex-col">
    <div class="h-14 max-sm:h-14 flex items-center">
      <top class="border-none" />
    </div>
    <div class="flex-1 h-full grid grid-rows-2 grid-cols-5 w-full overflow-hidden">
      <div class="row-span-2 col-span-1 bg-gray-100 max-md:hidden">左</div>
      <div class="col-span-4 row-span-2">
        <div class="flex w-full h-full flex-col">
          <div class="flex justify-center p-3">
            <input type="text" v-model="uid" class="px-4 py-1 rounded-2xl border" placeholder="搜索用户id" />
            <button class="ml-2 px-4 py-1 rounded-2xl" @click="get(uid)">搜索</button>
          </div>
          <div class="text-sm">
            <div class="py-2 mb-5" v-if="queryUserList().userList.length != 0">
              <h2 class="">搜索历史</h2>
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
              <div
                class="flex gap-2"
                v-for="(i, index) in userLists?.playlist"
                :index="index"
                @click="getListSongs(i.id)">
                <span class="text-xs border mb-3 border-sky-500 bg-white px-3 py-1 rounded-md">
                  {{ i.name }}
                </span>
              </div>
            </div>
          </div>
          <div class="bg-sky-300 flex-1 overflow-hidden">
            <div class="h-full overflow-y-scroll">
              <p
                class="bg-white p-2 hover:bg-gray-100"
                v-for="(k, index) in listsSongs?.songs"
                :index="index"
                @click="playMusic(k)">
                {{ k.name }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="">
      <Suspense>
        <PlayBar class=""> </PlayBar>
      </Suspense>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
<script setup lang="ts">
import { ListSongs } from '#/List/ListSongs'
import { UserList } from '#/List/userList'
import { ListApi } from '@/Api/List'
import { queryUserList } from '@/stores'
import { playMusic } from '@/utils'

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
