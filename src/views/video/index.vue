<script setup lang="ts">
import { MvApi } from '@/Api'

const newData = ref()
const hotData = ref()
const area = ',内地,港台,欧美,日本,韩国'.split(',')
const page = reactive({
  limit: 20,
  offset: 0,
})
let newActiveTab = ref<string>('')
let WActiveTab = ref<string>('')
const getData = async (type: string, area: string, ch?: boolean) => {
  if (type == '最新MV') {
    newData.value = undefined
    newData.value = await MvApi.getAllMV(
      {
        area,
      },
      {
        limit: page.limit,
        offset: ch ? Math.floor(Math.random() * 40) : 1,
      },
    )
  } else {
    hotData.value = undefined
    hotData.value = await MvApi.WangYiMV(
      {
        area,
      },
      {
        limit: page.limit,
        offset: ch ? Math.floor(Math.random() * 40) : 1,
      },
    )
  }
}

let data = ref<{ name: string; data: Ref<any> }[]>([
  {
    name: '精品MV',
    data: computed(() => hotData.value),
  },
  {
    name: '最新MV',
    data: computed(() => newData.value),
  },
])

newData.value = await MvApi.getAllMV({}, page)
hotData.value = await MvApi.WangYiMV({}, page)
</script>

<template>
  <ElScrollbar>
    <div class="space-y-3 w-full h-full color" v-for="i in data" :key="i.name">
      <div class="">
        <div class="flex items-center gap-3">
          <h1 class="">{{ i.name }}</h1>
          <div v-if="i.data" class="type">
            <template v-if="i.name == '最新MV'">
              <span
                v-for="k in area"
                :key="k"
                :class="[
                  i.name == '最新MV'
                    ? newActiveTab == k
                      ? '!bg-sky-500'
                      : ''
                    : WActiveTab == k
                    ? 'bg-sky-500'
                    : '',
                ]"
                @click="
                  getData(i.name, k),
                    i.name == '最新MV' ? (newActiveTab = k) : (WActiveTab = k)
                ">
                {{ k == '' ? '全部' : k }}
              </span>
            </template>
            <i
              class="fa-solid fa-refresh !bg-no ml-2 !text-lg dark:text-gray-600 hover:text-sky-500 dark:hover:text-sky-500"
              :class="[i.data ? '' : 'animate-spin']"
              @click="
                getData(i.name, i.name == '最新MV' ? newActiveTab : WActiveTab, true)
              "></i>

            {{ newActiveTab }}
          </div>
          <div class="" v-else><Loading>loading...</Loading></div>
        </div>
        <div class="item w-full grid grid-cols-2 gap-3 xl:grid-cols-4 p-5">
          <Card
            v-for="item in i.data?.data"
            to="mv"
            :key="item.id"
            :img="item.cover"
            :name="item.name"
            :singer="item.artistName"
            :count="item.playCount"
            :duration="item.duration"
            :typ="2"
            :id="item.id">
          </Card>
        </div>
      </div>
    </div>
  </ElScrollbar>
</template>

<style scoped lang="scss">
.color {
  h1 {
    @apply dark:text-white text-sky-500 font-bold;
  }
  .type {
    @apply dark:text-gray-700  flex items-center gap-2 *:bg-gray-300 *:p-1 *:rounded-md *:cursor-pointer *:text-xs;
  }
}
</style>
