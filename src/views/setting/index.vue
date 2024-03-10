<template>
  <div class="flex flex-col">
    <h1 class="text-xl text-sky-400 italic mb-3">SETTING</h1>
    <div class="w-full h-full flex flex-col">
      <!-- <div class="w-full flex gap-3">
        <a class="px-10" v-for="(k, index) in 10" :key="index">
          <span class="px-2 border-b-4 border-pink-400" @click="i = index">
            {{ k }}
          </span>
        </a>
      </div> -->

      <el-tabs v-model="activeName" class="p-0">
        <el-tab-pane label="常规" name="first" class="text-sm p-2">
          <div class="flex items-center">
            音乐品质：
            <el-radio-group v-model="main().config.quality">
              <el-radio
                class="text-red-300"
                v-for="(item, index) in MusicConfig"
                :key="index"
                :value="item"
                :label="item"></el-radio>
            </el-radio-group>
            <p class="ml-5 text-gray-400 text-sm font-normal">注：standard 标准音质，higher 较高音质，exhigh 高音质</p>
          </div>
        </el-tab-pane>

        <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
<script lang="ts" setup>
import { MusicConfig } from '#/config'
import { main } from '@/stores'
const activeName = ref('first')
</script>
<style lang="scss" scoped>
:deep(.el-radio__input.is-checked) {
  & + .el-radio__label {
    @apply text-pink-400;
  }
}
</style>
