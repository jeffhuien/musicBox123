<script setup lang="ts">
import { Song } from '#/song/songInfo'
import { main, playControl, playList } from '@/stores'
import { formatTime, playMusic } from '@/utils'

let { playList1, playIndex } = toRefs(playList())

const props = defineProps({
  listsSongs: {
    type: Object as PropType<Song[]>,
    required: false,
    default: () => [],
  },
})

function play(row: Song) {
  playMusic(row)
  if (!playList1.value) {
    playList1.value = props.listsSongs?.map((i) => {
      return {
        id: i.id,
        name: i.name,
        fee: i.fee,
        time: formatTime(i.dt, 'ms'),
        singerName: i.ar.length > 1 ? i.ar.map((item: any) => item.name).join('、') : i.ar[0].name,
      }
    })
  } else {
    if (!(playList1.value?.length == props.listsSongs.length && playList1.value[0].id == props.listsSongs[0].id)) {
      playList1.value = props.listsSongs?.map((i) => {
        return {
          id: i.id,
          fee: i.fee,
          time: formatTime(i.dt, 'ms'),
          name: i.name,
          singerName: i.ar.length > 1 ? i.ar.map((item: any) => item.name).join('、') : i.ar[0].name,
        }
      })
    }
  }
  playIndex.value = playList1.value.findIndex((i) => i.id == row.id, 0)
  // setStyle()
}

function setStyle({ row, rowIndex }: { row: Song; rowIndex: number }) {
  if (row.fee == 0) {
    return '!text-gray-400'
  }
  if (rowIndex == playIndex.value && row.id == playControl().playId) {
    return '!text-sky-500 !opacity-100 !bg-gray-200 !rounded-md'
  }

  return ''
}
</script>

<template>
  <el-table
    v-if="!main().isMobile"
    :data="props.listsSongs"
    height="100%"
    width="100%"
    :flexible="true"
    class="h-full"
    :show-overflow-tooltip="true"
    :row-class-name="setStyle"
    @row-click="play">
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
    :show-overflow-tooltip="main().isMobile ? false : true"
    :show-header="false"
    :row-class-name="setStyle"
    :data="listsSongs"
    @row-click="play">
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
    <el-table-column :align="'right'">
      <template #default="scope">
        <p>
          {{ formatTime(scope.row.dt, 'ms') }}
        </p>
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
