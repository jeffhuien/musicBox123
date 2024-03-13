<template>
  <div class="flex flex-col p-2">
    <h1 class="text-xl text-sky-400 italic mb-3">SETTING</h1>
    <div class="w-full h-full flex flex-col">
      <el-tabs v-model="active" class="p-0">
        <el-tab-pane label="常规" name="first" class="text-sm p-2">
          <div class="flex flex-col gap-3">
            <div class="item" v-for="(i, index) in CommonConfig" :index="index">
              <span class="mr-4"> {{ i.label }} </span>
              <el-radio-group class="mr-3" v-model="config[i.source]">
                <el-radio
                  class="text-red-300"
                  v-for="(item, index) in i.value"
                  :key="index"
                  :value="item"
                  :label="item"></el-radio>
              </el-radio-group>
              <p class="commit" v-if="i?.commit">注：{{ i.commit }}</p>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane class="text-red-500" label="Task" name="fourth">Task</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
<script lang="ts" setup>
import { ColorModeConfig, MusicConfig } from '#/config'
import { main } from '@/stores'

const active = ref('first')
const { config } = toRefs(main())
const CommonConfig: { label: string; value: any; source: any; commit?: string }[] = [
  {
    label: '音乐品质',
    source: 'quality',
    value: MusicConfig,
    commit: `standard 标准音质，higher 较高音质，exhigh 高音质`,
  },
  {
    label: '暗黑模式',
    source: 'colorMode',
    value: ColorModeConfig,
    commit: `黑、白、跟随系统`,
  },
]

function setColor(value: string) {
  if (value === 'system') {
    document.documentElement.classList.value = ''

    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark')
  } else {
    document.documentElement.classList.value = value
  }
}
setColor(config.value.colorMode)
watch(config.value, (newVal) => {
  setColor(newVal.colorMode)
})
</script>
<style lang="scss" scoped>
:deep(.el-radio__input.is-checked) {
  & + .el-radio__label {
    @apply text-pink-300;
  }
}

.item {
  @apply md:w-1/2 flex flex-wrap items-center border shadow-sm p-2 rounded-md;
  @apply dark:bg-slate-700 dark:border-none dark:border-b;
  .commit {
    @apply text-xs text-gray-400 font-normal;
  }
}
</style>
