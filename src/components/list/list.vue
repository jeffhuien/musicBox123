<script setup lang="ts">
import { ISMobile } from '@/stores'
import { formatTime, playMusic } from '@/utils'
const props = defineProps({
  listsSongs: {
    type: Object as PropType<any>,
    required: false,
  },
})
</script>

<template>
  <el-table
    v-if="!ISMobile().isMobile"
    :data="props.listsSongs"
    height="100%"
    width="100%"
    class="h-full"
    :show-overflow-tooltip="true"
    @row-click="playMusic">
    <el-table-column label="序号" type="index" width="55" align="right" :show-overflow-tooltip="false" />
    <el-table-column label="歌曲" width="300">
      <template #default="scope">
        <div class="">
          <span>
            {{ scope.row.name }}
          </span>
          <span
            class="text-xs bg-yellow-600 text-white ml-3 border border-yellow-100 rounded-xl px-2"
            v-if="scope.row.fee === 1">
            vip
          </span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="歌手" width="300">
      <template #default="scope">
        <span v-if="scope.row.ar.length > 1">
          {{ scope.row.ar.map((item: any) => item.name).join('、') }}
        </span>
        <span v-else>
          {{ scope.row.ar[0].name }}
        </span>
      </template>
    </el-table-column>
    <el-table-column label="专辑" :hidden-sm-and-down="true">
      <template #default="scope">
        {{ scope.row.al.name }}
      </template>
    </el-table-column>
    <el-table-column label="时长" :hidden-sm-and-down="true">
      <template #default="scope">
        {{ formatTime(scope.row.dt, 'ms') }}
      </template>
    </el-table-column>
  </el-table>

  <el-table
    v-else
    height="100%"
    width="100%"
    class="h-full"
    :show-overflow-tooltip="ISMobile().isMobile ? false : true"
    :show-header="false"
    :data="listsSongs"
    @row-click="playMusic">
    <el-table-column>
      <template #default="scope">
        <div class="flex items-center gap-3">
          <img class="w-8 h-8 object-cover rounded-md" :src="scope.row.al.picUrl" />
          <div class="flex flex-col">
            <div class="text-sm">
              {{ scope.row.name }}
              <span
                class="text-xs bg-yellow-600 text-white ml-3 border border-yellow-100 rounded-xl px-2"
                v-if="scope.row.fee === 1">
                vip
              </span>
            </div>
            <div>
              <span v-if="scope.row.ar.length > 1">
                {{ scope.row.ar.map((item: any) => item.name).join('、') }}
              </span>
              <span v-else>
                {{ scope.row.ar[0].name }}
              </span>
            </div>
          </div>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped lang="scss">
:deep(.el-table td.el-table__cell),
:deep(.el-table th.el-table__cell.is-leaf) {
  border: none;
}
</style>
