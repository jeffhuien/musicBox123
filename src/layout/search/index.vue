<script setup lang="ts">
import { SearchApi } from '@/Api'
import router from '@/router'
import { TabsPaneContext } from 'element-plus'
let searchData = ref<
  | {
      [key: string]: any
    }
  | {
      singer: any
      song: any
      al: any
      mv: any
      list: any
      [key: string]: any
    }
>({})
let searchKeyWords = ref<string>()
// 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样)
const handleClick = async (tab: TabsPaneContext, event: Event) => {
  if (tab.paneName === 'list' && !searchData.value.list) {
    searchData.value.list = await SearchApi.Search(searchKeyWords.value!, 1000)
  } else if (tab.paneName === 'singer' && !searchData.value.singer) {
    searchData.value.singer = await SearchApi.Search(searchKeyWords.value!, 100)
  } else if (tab.paneName === 'mv' && !searchData.value.mv) {
    searchData.value.mv = await SearchApi.Search(searchKeyWords.value!, 1004)
  } else if (tab.paneName === 'al' && !searchData.value.al) {
    searchData.value.al = await SearchApi.Search(searchKeyWords.value!, 10)
  }
}
watchEffect(async () => {
  if (router.currentRoute.value.name === 'search') {
    searchData.value = {}
    searchKeyWords.value = router.currentRoute.value.query.keywords?.toString()
    searchData.value.song = await SearchApi.Search(searchKeyWords.value!)
  }
})

let activeName = ref('song')
</script>
<template>
  <div class="w-full h-full flex flex-col select-text">
    <h1>
      <span class="text-sky-500 font-bold text-2xl">
        {{ searchKeyWords }}
      </span>
      的搜索结果</h1
    >
    <div class="flex-1 flex flex-col h-full overflow-hidden dark:bg-gray-800">
      <el-tabs
        @tab-click="handleClick"
        class="size-full flex flex-col"
        v-model="activeName">
        <el-tab-pane label="歌曲" lazy class="size-full" name="song">
          <ElScrollbar v-if="searchData.song?.code == 200" class="h-full">
            <List :lists-songs="searchData?.song?.result?.songs" />
          </ElScrollbar>
          <ElEmpty
            description="网络太拥挤了~ 待会再试试吧~"
            :image="'/img/ico/Not Found illustration.svg'"
            v-else
            class="text-xs text-gray-500 h-full">
          </ElEmpty>
        </el-tab-pane>
        <el-tab-pane label="mv" lazy class="size-full" name="mv">
          <ElScrollbar v-if="searchData.mv?.code == 200">
            <div class="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-2 gap-2 p-5">
              <Card
                v-for="(i, d) in searchData.mv?.result?.mvs"
                :index="d"
                to="mv"
                :id="1 * i.id"
                :typ="2"
                :name="i.name"
                :singer="i.artistName"
                :img="i.cover"
                :count="i.playTime"></Card>
            </div>
          </ElScrollbar>
          <ElEmpty
            description="网络太拥挤了~ 待会再试试吧~"
            :image="'/img/ico/Not Found illustration.svg'"
            v-else
            class="text-xs text-gray-500 h-full">
          </ElEmpty>
        </el-tab-pane>
        <el-tab-pane label="歌手" lazy class="size-full" name="singer">
          <ElScrollbar v-if="searchData.singer?.code == 200">
            <div class="grid xl:grid-cols-4 md:grid-cols-3 max-sm:grid-cols-2 gap-4">
              <div
                class=""
                @click="$router.push(`/singer/${i.id}`)"
                v-for="i in searchData?.singer?.result?.artists">
                <div class="flex gap-4 items-center w-full h-36">
                  <img
                    :src="i.picUrl"
                    class="w-24 h-24 rounded-full object-cover"
                    alt="" />
                  <p class="font-bold text-black/80">{{ i.name }}</p>
                </div>
              </div>
            </div>
          </ElScrollbar>
          <ElEmpty
            description="网络太拥挤了~ 待会再试试吧~"
            :image="'/img/ico/Not Found illustration.svg'"
            v-else
            class="text-xs text-gray-500 h-full">
          </ElEmpty>
        </el-tab-pane>
        <el-tab-pane label="歌单" lazy class="size-full" name="list">
          <ElScrollbar v-if="searchData.list?.code == 200">
            <div
              class="grid items-center justify-center xl:grid-cols-5 md:grid-cols-5 max-md:grid-cols-4 gap-3 max-xl:grid-cols-5 max-sm:grid-cols-3">
              <Card
                v-for="(i, d) in searchData.list?.result?.playlists"
                :index="d"
                to="list"
                :id="i?.id"
                :name="i.name"
                :img="i.coverImgUrl"></Card>
            </div>
          </ElScrollbar>
          <ElEmpty
            description="网络太拥挤了~ 待会再试试吧~"
            :image="'/img/ico/Not Found illustration.svg'"
            v-else
            class="text-xs text-gray-500 h-full">
          </ElEmpty>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell) {
  @apply bg-no;
}
:deep(.el-tabs__nav-wrap::after) {
  @apply bg-no;
}

:deep(.el-tabs__content) {
  @apply flex-1 w-full h-full;
}

:deep(.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell) {
  background-color: #ffffff00 !important;
}
</style>
