<script setup lang="ts">
import { CloudSongDataType } from '#/song/cloudSong'
import { Song } from '#/song/songInfo'
import { SongApi } from '@/Api/song'
import { main, playControl, playList } from '@/stores'
import { formatTime } from '@/utils'

let { playList1, playIndex, isCloud, name } = toRefs(playList())
let { playCloudMusic, playMusic } = playControl()

const props = defineProps({
  listsSongs: {
    type: Object as PropType<Song[] | CloudSongDataType[]>,
    required: false,
    default: () => [],
  },
  listName: {
    type: String,
    default: '未知的歌单',
  },
  noTag: {
    type: Boolean,
    default: false,
  },
  cloud: {
    type: Boolean,
    default: false,
  },
})

const { cloud, listsSongs, listName, noTag } = toRefs(props)

function _check() {
  let fees = []
  for (let [index, i] of listsSongs.value?.entries()!) {
    let p = Promise.resolve(SongApi.check(i.id))
    fees.push({ index: index, target: p })
  }
  Promise.all(fees)
    .then((res) => {
      res.forEach((i) =>
        i.target.then((r) => {
          if (!r.success) listsSongs.value![i.index].fee = 404
        }),
      )
    })
    .catch(() => console.log('出错了'))
}

function play(row: Song) {
  function _set(i: Song | CloudSongDataType) {
    let time = formatTime(i.dt, 'ms')
    return {
      id: i.id,
      name: i.name,
      fee: i.fee,
      time: time ?? '未知',
      singerName: i.ar ? (i.ar?.length > 1 ? i.ar.map((item: any) => item.name).join('、') : i.ar[0].name) : 'Error',
    }
  }
  if (!cloud.value) {
    playMusic(row)
    isCloud.value = false
  } else {
    playCloudMusic(row)
    isCloud.value = true
  }
  if (!playList1.value) {
    playList1.value = listsSongs.value?.map((i) => {
      return _set(i)
    })
  } else {
    if (
      !(
        playList1.value?.length == listsSongs.value.length &&
        playList1.value[0].id == listsSongs.value[0].id &&
        name.value == listName.value
      )
    ) {
      playList1.value = undefined
      playList1.value = listsSongs.value?.map((i) => {
        return _set(i)
      })
    }
  }
  if (listName.value) name.value = listName.value
  playIndex.value = playList1.value.findIndex((i) => i.id == row.id, 0)
}

function setStyle({ row, rowIndex }: { row: Song; rowIndex: number }) {
  let bg = '!bg-no dark:hover:!bg-gray-700 hover:!bg-gray-50 dark:hover:text-gray-400'
  if (rowIndex == playIndex.value && row.id == playControl().playId) {
    return '!text-sky-500 ' + bg
  }
  return bg
}

defineExpose({
  play,
})
if (listsSongs.value) {
  if (!playList1.value) _check()
  if (!(listsSongs.value.length == playList1.value?.length && playList1.value)) _check()
}
</script>

<template>
  <template v-if="listsSongs">
    <el-table
      height="100%"
      width="100%"
      class="h-full"
      :data="listsSongs"
      :flexible="true"
      :show-overflow-tooltip="true"
      :tooltip-options="{ effect: 'light', showArrow: false, offset: -60, popperClass: '!border-red-200' }"
      :row-class-name="setStyle"
      :cell-class-name="' !border-none  '"
      :class-name="'!bg-no'"
      :header-cell-class-name="'!bg-no !border-none'"
      :header-row-class-name="'!bg-no'"
      @row-dblclick="play">
      <template v-if="!main().isMobile">
        <el-table-column
          label=""
          type="index"
          align="center"
          min-width="5%"
          :fit="true"
          :class-name="'text-gray-400'"
          :show-overflow-tooltip="false" />
        <el-table-column align="left" :label="`歌曲( ${listsSongs.length} )`" min-width="40%" @click="play">
          <template #default="scope">
            <div class="flex w-full justify-between">
              <span class="w-2/3 truncate">
                {{ scope.row.name }}
              </span>
              <span v-if="scope.row.fee === 1 && !noTag">
                <Tag :type="'vip'" />
              </span>
              <!-- <span v-if="scope.row.fee === 404 && !noTag">
                <Tag :type="'notSource'" />
              </span> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column label="歌手" min-width="20%">
          <template #default="scope">
            <span v-if="scope.row.ar?.length > 1">
              {{ scope.row.ar.map((item: any) => item.name).join('、') }}
            </span>
            <span v-else>
              <template v-if="scope.row.ar">
                {{ scope.row.ar[0]?.name }}
              </template>
              <template v-else> 加载失败 </template>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="专辑" :hidden-sm-and-down="true" min-width="10%">
          <template #default="scope">
            {{ scope.row.al?.name }}
          </template>
        </el-table-column>
        <el-table-column label="时长" :hidden-sm-and-down="true" min-width="10%">
          <template #default="scope">
            {{ formatTime(scope.row.dt, 'ms') }}
          </template>
        </el-table-column>
        <el-table-column label="大小" :hidden-sm-and-down="true" min-width="10%" v-if="cloud">
          <template #default="scope"> {{ (scope.row.fileSize / 1000000).toFixed(1) }}M </template>
        </el-table-column>
      </template>

      <template v-else>
        <el-table-column>
          <template #default="scope">
            <div class="flex items-center gap-3 w-full">
              <img class="w-8 h-8 object-cover rounded-md" :src="scope.row.al?.picUrl" />
              <div class="flex flex-col flex-1 truncate">
                <div class="text-sm flex">
                  <span class="!w-5/6 truncate">
                    {{ scope.row?.name }}
                  </span>
                  <span v-if="scope.row.fee === 1 && !noTag">
                    <Tag :type="'vip'" />
                  </span>
                  <!-- <span v-if="scope.row.fee === 404 && !noTag">
                    <Tag :type="'notSource'" />
                  </span> -->
                </div>
                <div class="w-full truncate text-xs opacity-50">
                  <span v-if="scope.row.ar?.length > 1" class="!w-4/6 truncate">
                    {{ scope.row.ar.map((item: any) => item.name).join('、') }}
                  </span>
                  <span v-else>
                    <template v-if="scope.row.ar">
                      {{ scope.row.ar[0]?.name }}
                    </template>
                  </span>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column :align="'right'" min-width="20%">
          <template #default="scope">
            <p class="text-xs">
              {{ formatTime(scope.row.dt, 'ms') }}
            </p>
          </template>
        </el-table-column>
      </template>

      <template #empty>
        <el-empty description="什么也没有找到"> </el-empty>
      </template>
    </el-table>
  </template>

  <template v-else>
    <div class="w-full h-full flex justify-center items-center">
      <ElEmpty description="加载失败" />
    </div>
  </template>
</template>

<style scoped lang="scss">
:deep(.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell) {
  background-color: #ffffff00 !important;
}
</style>
