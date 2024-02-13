<script setup lang="ts">
import { Hot } from '#/search/hot'
import { searchSuggest } from '#/search/searchSuggest'
import { SearchApi } from '@/Api/search'
import router from '@/router'
import { searchHistory } from '@/stores'

// let searchKeyWords = inject('searchKeyWords', ref<string>())
let searchKeyWords = ref<string>()
let keyword = ref('')
let data = ref<searchSuggest>()
let show = ref(false)
let ls = ref<Hot>({} as unknown as Hot)
let currentRoute = useRouter().currentRoute.value
async function search(keywords: string) {
  show.value = !show.value
  data.value = await SearchApi.Suggest(keywords)
}

async function enterSearch(keywords: string) {
  searchHistory().add(keywords)
  if (currentRoute.name !== 'search') {
    searchKeyWords.value = keywords
    router.push(`/search?keywords=${keywords}`)
    return
  }
  searchKeyWords.value = keywords
}

async function getFocus() {
  console.log(1234)
  show.value = true
  if (!ls.value.code) ls.value = await SearchApi.Hot()
  if (keyword.value) data.value = await SearchApi.Suggest(keyword.value)
}
function lostFocus() {
  setTimeout(() => {
    show.value = false
    data.value = {} as searchSuggest
  }, 300)
}

//TODO 搜索建议关键词匹配
//TODO 搜索无建议时央视
</script>

<template>
  <div class="w-full relative flex max-md:ml-0">
    <i class="fa-solid fa-magnifying-glass absolute top-[25%] left-2 opacity-50"></i>
    <input
      type="text"
      class="transition-all duration-700 w-52 focus:w-64 rounded-3xl border caret-pink-500 pl-8 py-2 max-sm:py-1 text-xs text-gray-600 focus:outline-sky-200 hover:border-lime-300 outline-none"
      v-model="keyword"
      @input="search(keyword)"
      @keyup.stop=""
      @focus="getFocus"
      @blur="lostFocus"
      @keyup.enter="enterSearch(keyword)" />
    <div
      v-show="show"
      class="max-sm:scale-90 suggest min-h-[13rem] flex overflow-hidden absolute top-[120%] max-sm:top-2 max-sm:-left-2 z-20 text-sm w-72 bg-white rounded-md shadow-lg">
      <!-- <div class="w-full h-full flex justify-center items-center" v-if="loading().searchBoxLoading">
        <Loading class="">loading...</Loading>
      </div> -->

      <div v-if="data?.result" class="h-full w-full">
        <div v-if="data.result.albums" class="flex flex-col gap-2 p-2 h-full border bg-white">
          <div class="flex p-1 border-b">
            <h2 class="self-center w-2/12 flex-shrink-0 text-gray-500 text-center">单曲</h2>
            <div class="flex-1 w-10/12">
              <div class="flex gap-2 flex-wrap text-sm" v-for="(item, index) in data.result.songs" :index="index">
                <p class="py-2 w-full hover:bg-gray-100 pl-2 truncate" @click="enterSearch(item.name)">
                  {{ item.name }} - {{ item.artists.map((i) => i.name).join('、') }}
                </p>
              </div>
            </div>
          </div>
          <div class="flex p-1 border-b">
            <h2 class="self-center w-2/12 text-gray-500 text-center">专辑</h2>
            <div class="flex-1 w-10/12">
              <div class="flex gap-2 flex-wrap text-sm" v-for="(item, index) in data.result.albums" :index="index">
                <p class="py-2 w-full hover:bg-gray-100 pl-2 truncate" @click="enterSearch(item.name)">
                  {{ item.name }} - {{ item.artist.name }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <template v-else>
          <div class="h-full border-none justify-center items-center flex">没有搜到歌曲哦~</div>
        </template>
      </div>

      <div v-else class="w-full">
        <div class="[&_h2]:mb-2 suggest flex flex-col gap-2 p-2 !min-h-52 border bg-white rounded-md shadow-lg">
          <div class="">
            <h2 class="">搜索历史</h2>
            <div class="flex gap-2 flex-wrap">
              <span
                v-for="i in searchHistory().searchHistory"
                @click="enterSearch(i)"
                class="text-xs border border-sky-500 bg-white px-3 py-1 rounded-2xl">
                {{ i }} <i @click.stop="searchHistory().remove(i)" class="fa-solid fa-xmark opacity-60"></i>
              </span>
            </div>
          </div>

          <div class="flex flex-col relative">
            <h2 class="">
              <span class="">热搜</span>
              <span class="block relative -top-3 w-10 h-3 bg-pink-500/75"> </span>
            </h2>
            <ul class="text-gray-500 list-decimal translate-x-5" v-if="ls.code">
              <li
                class="text-xs hover:bg-gray-100 px-2 py-1 rounded-2xl"
                v-for="(i, index) in ls.result.hots"
                :index="index"
                @click="enterSearch(i.first)">
                {{ i.first }}
              </li>
            </ul>
            <Loading v-else class="">loading</Loading>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
