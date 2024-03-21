<script setup lang="ts">
import router from '@/router'

let id = ref('0')
id.value = router.currentRoute.value.params.id as string

watch(router.currentRoute, (n) => {
  if (n.name != 'comment') return
  id.value = n.params.id as string
  ElMessage(id.value)
})
</script>

<template>
  <div class="flex flex-col h-full w-full">
    <div class="p-4 max-sm:hidden border-b">
      <Top></Top>
    </div>
    <div class="flex flex-1 gap-2 overflow-hidden">
      <Comment :id="id"></Comment>
    </div>
    <div class="">
      <PlayBar class="max-sm:hidden"></PlayBar>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
