<script setup lang="ts">
import { ListSongs } from '#/List/ListSongs'
let searchData = inject('searchData', ref<ListSongs>())
let searchKeyWords = inject('searchKeyWords', ref<string>())

onMounted(() => {
  searchKeyWords.value = useRouter().currentRoute.value.query.keywords?.toString()
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
