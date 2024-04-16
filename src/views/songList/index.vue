<script setup lang="ts">
import { ListDetail, Playlist } from '#/List/ListDetail'
import { ListApi } from '@/Api/List'
import { useRoute, useRouter } from 'vue-router'

let Id = ref<string>(useRoute().params.id as string)
let data = ref<any>()
let Detail = ref<ListDetail>()
let info = ref<Playlist>()

watch(useRoute(), async (newValue) => {
  if (!(newValue.name === 'song.list')) return
  Id.value = newValue.params.id as string
  data.value = undefined
  setData()
})

async function setData() {
  Detail.value = await ListApi.getListDetail(Id.value)
  total.value = Detail.value?.playlist?.trackCount ?? 0
  info.value = Detail.value?.playlist
  let t = await ListApi.getListSongs(Id.value, {
    limit: page.limit,
    offset: 0,
  })
  data.value = t
}

const noMore = computed(() => data.value?.songs.length >= total.value)
let page = reactive({ limit: 20, offset: 1 })
let total = ref(0)
const loadMore = async () => {
  let t = await ListApi.getListSongs(Id.value, {
    limit: page.limit,
    offset: page.offset++ * page.limit,
  })
  data.value.songs.push(...t.songs)
}
onBeforeMount(async () => {
  Id ? setData() : useRouter().push({ name: '404' })
})
</script>

<template>
  <ScrollLoad :more="noMore" :page="page" @load-more="loadMore">
    <ElScrollbar>
      <SongListView
        v-if="data"
        :data="data?.songs"
        :info="info!"
        :more="noMore"
        :page="page"
        @load-more="loadMore" />
      <Loading v-else>loading...</Loading>
    </ElScrollbar>
  </ScrollLoad>
</template>

<style scoped lang="scss">
:deep(.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell) {
  background-color: #ffffff00 !important;
}
</style>
