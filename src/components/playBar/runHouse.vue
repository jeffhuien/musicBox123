<!--
 * @Author: GAO GAO
 * @Date: 2023-10-06 14:58:01
-->
<template>
  <Vue3Marquee :pause="scroll" :pause-on-hover="true" :pause-on-click="true">
    <span ref="S_text">
      {{ data.data }}
    </span>
  </Vue3Marquee>
</template>

<script setup>
let data = defineProps(['data'])
let S_text = ref(null)
let scroll = ref(false) //false 表示滚动，true 表示不滚动

/**
 *
 * @param {*} S_text 需要滚动的文字
 */
function resize(S_text) {
  let [a, b] = [S_text.value.clientWidth, S_text.value.parentNode.clientWidth]
  if (a >= b) scroll.value = false
  else scroll.value = true
}
onMounted(async () => {
  await nextTick()
  addEventListener('resize', resize(S_text))
})
</script>
