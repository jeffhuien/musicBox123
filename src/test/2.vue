<script setup lang="ts">
let a = ref<string>('')

function s(t: string) {
  if (!f.value) console.log(t)
}

let f = ref<boolean>(false)
function start() {
  f.value = true
}

function end() {
  f.value = false
  s(a.value)
}
</script>

<template>
  <div class="p-5 border bg-red-500">
    {{ a }}
    <input @compositionstart="start" @compositionend="end" type="text " class="border" v-model="a" @input="s(a)" />
  </div>
</template>

<style scoped lang="scss"></style>
