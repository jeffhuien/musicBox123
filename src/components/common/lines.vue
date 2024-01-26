<script setup lang="ts">
const props = defineProps({
  line: {
    type: Number,
    required: false,
    default: 1,
  },
})
// TODO: 完成显示规定行数
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss"></style>
