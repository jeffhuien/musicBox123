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
    <div class="flex-1 h-full overflow-hidden">
      <list class="h-full" :lists-songs="searchData?.result?.songs"></list>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-table td.el-table__cell),
:deep(.el-table th.el-table__cell.is-leaf) {
  border: none;
}
</style>
