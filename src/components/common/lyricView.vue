<script setup lang="ts">
import { playControl } from '@/stores'
import { ElScrollbar } from 'element-plus'

const props = defineProps<{
  lrcStr: string
}>()
function toLrc(lrcStr: string) {
  let lrc: string[] | { time: number; words: string }[] = lrcStr
    .split('\n')
    .filter((i) => i)
    .map((i) => i.trim())
  //   let index = lrc.findIndex((i: string) => i.charAt(0) == '[')

  //   let head = lrc
  //     .splice(0, index)
  //     .filter((i: string) => i)
  //     .map((i: string) => JSON.parse(i))
  //     .map((i: { c: any }) =>
  //       i.c.map((k: any) => {
  //         return { tx: k.tx }
  //       }),
  //     )

  let body = lrc
    .map((i: any) => i.split(']'))
    .map((k: any) => {
      return {
        time: toSeconds(k[0].replace('[', '')),
        words: k[1],
      }
    })

  lrc = [
    // ...head,
    //
    ...body,
  ]
  return lrc
}
function toSeconds(time: string) {
  let min = parseInt(time.split(':')[0])
  let sec = parseFloat(time.split(':')[1])
  return min * 60 + sec
}
let { lrcStr } = toRefs(props)

let data = ref<
  {
    time: number
    words: string
  }[]
>(toLrc(lrcStr.value))

let ls = ref<HTMLDivElement>()
let scrollBar = ref<InstanceType<typeof ElScrollbar>>()
let h = ref(0)
let n = ref(0)
onMounted(() => {
  h.value = ls.value?.children.item(0)?.clientHeight ?? 0
  n.value = ls.value?.parentElement?.parentElement?.offsetHeight
    ? Math.floor(ls.value?.parentElement?.parentElement?.offsetHeight / h.value / 2)
    : 0

  scrollBar.value!.update = () => {
    console.log(1234)
  }
})

onUpdated(() => {
  data.value = toLrc(lrcStr.value)
})

function set(index: number) {
  if (
    data.value[index].time <= playControl().currentTime &&
    (index + 1 < data.value.length ? data.value[index + 1].time >= playControl().currentTime : true)
  ) {
    if (index != 0) ls.value?.children.item(index - 1)?.classList.remove('active')
    if (index > n.value) {
      // scrollBar.value?.setScrollTop(h.value * (index - n.value))
      scrollBar.value?.scrollTo({
        top: h.value * (index - n.value), // y 坐标
        behavior: 'smooth', // 可选值：smooth、instant、auto
      })
      // ls.value ? (ls.value!.style.transform = `translateY(-${h.value * (index - n.value)}px)`) : ''
    }
    return true
  }

  return false
}
</script>

<template>
  <div class="select-none w-full h-full p-10 text-sm text-center transition-all">
    <ElScrollbar :always="false" v-if="props.lrcStr" ref="scrollBar" view-class="transition-all ease-in-out">
      <div class="transition-all ease-linear h-full" ref="ls">
        <p
          class="py-2 transition-all ease-linear"
          :class="set(index) ? 'active' : ''"
          v-for="(item, index) in data"
          :key="index">
          {{ item.words }}
        </p>
      </div>
    </ElScrollbar>
    <p v-else>暂无歌词</p>
  </div>
</template>

<style scoped lang="scss">
.active {
  @apply text-pink-400 italic text-2xl;
}
</style>
