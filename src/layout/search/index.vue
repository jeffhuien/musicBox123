<script setup lang="ts">
import { ListSongs } from '#/List/ListSongs'
import { SearchApi } from '@/Api/search'
// let searchData = inject('searchData', ref<ListSongs>())
// let searchKeyWords = inject('searchKeyWords', ref<string>())
let searchData = ref<ListSongs>()
let searchKeyWords = ref<string>()

onMounted(async () => {
  let r = useRouter().currentRoute
  searchKeyWords.value = r.value.query.keywords?.toString()

  watch(r, async () => {
    searchKeyWords.value = r.value.query.keywords?.toString()
    searchData.value = (await SearchApi.SearchSongs(searchKeyWords.value!)) as unknown as ListSongs
  })

  if (searchKeyWords.value) {
    searchData.value = (await SearchApi.SearchSongs(searchKeyWords.value)) as unknown as ListSongs
  }
})
</script>
<template>
  <div class="w-full h-full flex flex-col">
    <div class="flex-1 h-full overflow-hidden dark:bg-gray-800">
      <list class="h-full" :lists-songs="searchData?.result?.songs"></list>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell) {
  @apply bg-no;
}
</style>
