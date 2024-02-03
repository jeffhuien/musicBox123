<template>
  <div class="">
    <span ref="S_text" class="whitespace-nowrap">
      {{ data.data }}
    </span>
    <Vue3Marquee v-if="scroll">{{ data.data }} </Vue3Marquee>
  </div>
</template>

<script setup>
let data = defineProps(['data'])
let S_text = ref()
let scroll = ref(false) //false 表示滚动，true 表示不滚动

function resize() {
  if (!S_text.value) return
  if (S_text.value.offsetWidth >= 200) {
    scroll.value = true
    S_text.value.classList.add('hidden')
  } else {
    scroll.value = false
    S_text.value.classList.remove('hidden')
  }
}
onMounted(async () => {
  await nextTick()
  watch(data, (n) => {
    resize()
  })
})
</script>
