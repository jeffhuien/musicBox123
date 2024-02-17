<script setup lang="ts">
const props = defineProps<{
  type: 'vip' | 'notSource'
}>()
</script>

<template>
  <div class="">
    <span
      class="text-xs inline-block opacity-100 text-yellow-500 ml-3 border border-yellow-500 rounded-md p-1 px-2 scale-75"
      v-if="props.type == 'vip'">
      VIP
    </span>
    <span
      class="text-xs inline-block bg-gray-400 opacity-100 text-white ml-3 border border-gray-100 rounded-md p-1 scale-75"
      v-if="props.type == 'notSource'">
      无音源
    </span>
  </div>
</template>

<style scoped lang="scss"></style>
