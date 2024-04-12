<script setup lang="ts">
import type { TabsPaneContext } from 'element-plus'
import { loginApi } from '@/Api'
import { UserList, auth, main } from '@/stores'
import { store } from '@/utils'
const activeName = ref('first')
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
async function LogOut() {
  try {
    await ElMessageBox.confirm('确认要注销登录吗？', {
      confirmButtonText: '是',
      cancelButtonText: '否',
      type: 'warning',
    })
    // 注销成功后的操作
    // auth().user = undefined
    // auth().isLogin = false
    // auth().level = 0
    // UserList().list = []
    // store.remove('cookie')
    ElMessage.success('bye bye~')
    console.log(loginApi)

    await loginApi.logout()
  } catch (error) {
    // 处理取消注销或其他错误
    console.error('注销失败：', error)
  }
}
</script>
<template>
  <!-- TODO design NEW -->
  <div class="flex flex-col w-full h-full">
    <div class="text-xl mb-2"> 我的收藏 </div>
    <el-tabs
      v-model="activeName"
      class="flex-1 flex flex-col w-full h-full"
      @tab-click="handleClick">
      <el-tab-pane label="歌曲" class="text-xl w-full h-full" name="first">
        <div class="h-full">
          <button class="border" @click="LogOut"> 12345</button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="list">Config</el-tab-pane>
      <el-tab-pane label="歌手" name="singer">Role</el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-tabs__nav-wrap::after) {
  @apply bg-no;
}
:deep(.el-tabs__content) {
  @apply flex-1;
}
</style>
