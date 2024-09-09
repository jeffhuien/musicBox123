<script setup lang="ts">
import { UserListType } from '#/index'
import { ListApi } from '@/Api'
import { auth, UserList } from '@/stores'
import { storeToRefs } from 'pinia'

const { list } = storeToRefs(UserList())
let uid = ref('')
async function setUserListData(uid: string) {
  let data = await ListApi.getList(uid)
  let t = data.playlist.map((I) => {
    return {
      name: I.name,
      id: I.id.toString(),
      img: I.coverImgUrl,
      count: I.trackCount,
      own: I.creator.nickname == auth().user?.profile.nickname ? true : false,
    } as UserListType
  })
  // t.splice(0, 1)
  return t
}

watch(
  () => auth().isLogin,
  async () => {
    if (auth().isLogin) {
      uid.value = auth().user!.account.id.toString()
      list.value = await setUserListData(uid.value)
    }
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <div class="w-full flex flex-col justify-center p-4 pt-0">
    <h1 class="dark:text-white">自建歌单</h1>
    <div class="item-block">
      <router-link
        :to="{ name: `song.list`, params: { id: k.id } }"
        class="flex items-center"
        v-for="(k, index) in list.filter((I, index) => I.own && index != 0)"
        :index="index">
        <!-- <i :class="k.ico" class="text-lg mr-2 w-7"></i> -->
        <div class="flex text-xs w-full">
          <img :src="k.img" class="w-7 h-7 mr-2 rounded-sm" alt="" />
          <div class="flex flex-col flex-1 truncate">
            <span class="overflow-hidden w-full truncate">
              {{ k.name }}
            </span>
            <span class="opacity-50"> {{ k.count }}首 </span>
          </div>
        </div>
      </router-link>
    </div>
    <!-- // -->
    <h1 class="dark:text-white">收藏歌单</h1>
    <div class="item-block">
      <router-link
        :to="{ name: `song.list`, params: { id: k.id } }"
        class="flex items-center"
        v-for="(k, index) in list.filter((I) => !I.own)"
        :index="index">
        <!-- <i :class="k.ico" class="text-lg mr-2 w-7"></i> -->
        <div class="flex text-xs w-full">
          <img :src="k.img" class="w-7 h-7 mr-2 rounded-sm" alt="" />
          <div class="flex flex-col flex-1 truncate">
            <span class="overflow-hidden w-full truncate">
              {{ k.name }}
            </span>
            <span class="opacity-50"> {{ k.count }}首 </span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
h1 {
  @apply text-xs opacity-30 mb-2;
  &:first-child {
    @apply mt-4;
  }
}
.item-block {
  @apply w-full flex flex-col justify-center;

  a {
    @apply text-xs p-2 mb-1 rounded-md text-gray-500 hover:bg-gray-100  dark:hover:bg-gray-700;

    &.router-link-active {
      @apply font-bold bg-gray-100 text-sky-500 dark:bg-gray-700;
    }
  }
}
</style>
