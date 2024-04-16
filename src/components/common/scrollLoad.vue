<template>
  <div ref="scrollContainer" class="h-full overflow-hidden">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const scrollContainer = ref<HTMLElement | null>(null)
let dom = ref<HTMLElement | null>()
const emit = defineEmits<{
  (e: 'loadMore', page: { limit: number; offset: number }): void
}>()
const props = defineProps<{
  page: { limit: number; offset: number }
  more: boolean //nomore
}>()
onMounted(() => {
  dom.value = scrollContainer.value?.querySelector('.el-scrollbar__wrap')
  if (dom.value) {
    dom.value.addEventListener('scroll', (e: Event) =>
      handleScroll(e.target as HTMLElement),
    )
    dom.value?.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault()
      }
    })
  }
})

let time = new Date().getTime()
const handleScroll = (e: HTMLElement) => {
  const container = e

  if (container && !props.more) {
    const { scrollTop, clientHeight, scrollHeight } = container
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      if (new Date().getTime() - time > 3000) {
        emit('loadMore', props.page)
        time = new Date().getTime()
      }
    }
  }
}
</script>

<style scoped lang="scss"></style>
