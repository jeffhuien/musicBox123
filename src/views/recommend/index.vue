<script setup lang="ts">
import { bannerType } from '#/index'
import { CommonApi } from '@/Api/Common'
import Card from '@/components/common/card.vue'
import { playControl } from '@/stores'
const { playMusicById } = playControl()

const banner = ref<bannerType>()
const list = ref<any>()
const newSongs = ref<any>()
const loading = computed(() => list.value?.playlists.length <= 1)
const page = reactive({
  limit: 15,
})
async function change(e: Event) {
  const target = e.target as HTMLInputElement
  target.classList.add('animate-spin')
  let t = list.value?.playlists[page.limit - 1]?.updateTime ?? ''
  list.value = await CommonApi.getHighQualityList(t, page.limit)
  target.classList.remove('animate-spin')
}

onBeforeMount(async () => {
  banner.value = await CommonApi.getBannerImg()
  list.value = await CommonApi.getHighQualityList('', page.limit)
  newSongs.value = await CommonApi.getNEWSong()
})

let showInfo = ref<HTMLElement>()
</script>

<template>
  <el-scrollbar class="h-full p-2">
    <div class="swiper max-sm:hidden p-3">
      <el-carousel type="card" height="200px" :autoplay="true" :interval="2000">
        <el-carousel-item v-for="(item, index) in banner?.banners" :key="index">
          <div class="relative w-full h-full">
            <el-image :src="item.imageUrl" fit="contain" class="rounded-lg h-full" />
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="list">
      <h1 class="opacity-80 font-bold mb-2 flex justify-between text-sky-400">
        今日推荐歌单
        <span class="">
          <i class="fa-solid fa-refresh" @click="change($event)"></i>
          <span class="text-xs"> 换一批 </span>
        </span>
      </h1>
      <el-skeleton
        class="w-full h-full flex gap-3 flex-wrap justify-between"
        :loading="loading"
        animated
        :count="10">
        <template #default>
          <div
            class="grid items-center justify-center xl:grid-cols-5 md:grid-cols-5 max-md:grid-cols-4 gap-3 max-xl:grid-cols-5 max-sm:grid-cols-3">
            <!--  -->
            <Card
              v-for="(i, d) in list?.playlists"
              :index="d"
              to="list"
              :id="i.id"
              :name="i.name"
              :img="i.coverImgUrl"
              :count="i.playCount"></Card>
          </div>

          <!-- <Loading v-else class="">loading</Loading> -->
        </template>

        <template #template>
          <div class="h-40 w-1/6 flex flex-col gap-1">
            <el-skeleton-item variant="image" style="height: 80%" />
            <el-skeleton-item variant="text" style="height: 10px" />
            <el-skeleton-item variant="text" style="height: 10px; width: 30%" />
          </div>
        </template>
      </el-skeleton>
    </div>

    <div class="songs">
      <h1 class="opacity-80 font-bold mb-2 flex justify-between text-sky-400">
        新歌速递
        <span class="">
          <i class="fa-solid fa-refresh" @click="change($event)"></i>
          <span class="text-xs"> 换一批 </span>
        </span>
      </h1>
      <el-skeleton
        class="w-full h-full flex gap-3 flex-wrap justify-between"
        :loading="loading"
        animated
        :count="10">
        <template #default>
          <div
            class="grid xl:grid-cols-5 md:grid-cols-3 max-md:grid-cols-2 gap-3 max-xl:grid-cols-5 max-sm:grid-cols-2">
            <div
              class="flex items-center gap-2"
              v-for="(i, index) in newSongs?.result"
              @click="playMusicById(i.id)"
              :index="index">
              <el-image lazy class="w-12 h-12 shrink-0 !rounded-lg" :src="i.picUrl" />
              <div class="flex flex-col overflow-hidden">
                <span class="text-sm">
                  {{ i.name }}
                </span>
                <span class="text-xs opacity-60 line-clamp-1"
                  >{{ i.song.artists.map((item: any) => item.name).join('、') }}
                </span>
              </div>
            </div>
          </div>
          <!-- <Loading v-else class="">loading</Loading> -->
        </template>

        <template #template>
          <div class="h-40 w-1/6 flex flex-col gap-1">
            <el-skeleton-item variant="image" style="height: 80%" />
            <el-skeleton-item variant="text" style="height: 10px; width: 30%" />
          </div>
        </template>
      </el-skeleton>
    </div>

    <div
      ref="showInfo"
      class="showInfo animate__animated animate__bounceIn fixed w-screen h-screen top-0 left-0 z-[100] flex justify-center items-center">
      <div
        class="bg-white shadow-2xl relative overflow-y-auto scrollbar-hidden shadow-red-400 rounded-xl p-10 w-1/2 h-1/2">
        <i
          class="fixed right-1/4 top-1/4 text-left transition-all duration-500 hover:rotate-180 hover:text-purple-600 fa-solid fa-xmark text-4xl bg-white w-12 flex justify-center items-center h-12 rounded-full shrink-0"
          @click="showInfo?.remove()"></i>
        <p class="text-center text-xl font-bold text-red-400">欢迎</p>
        <div class="text-red-400 mt-1 font-bold">
          <p> 说明： </p>
          <div class="indent-8">
            <div class="">
              功能：实现了音乐的播放(
              <span class="text-emerald-500"> 双击 </span>
              ),mv的播放、播放模式的切换、音量的控制、歌词的滚动、收藏、评论、暗黑模式、使用响应式布局适配了不同的设备尺寸
            </div>
            <div>
              页面：搜索,歌词(单击歌曲封面),歌词滚动,歌单,歌手,MV,播放列表,收藏列表,用户中心,登录,退出登录,评论,网盘
            </div>
          </div>
        </div>
        <div>
          <div class="">介绍:</div>
          <div class="indent-8">
            <div class="flex flex-col gap-3">
              <div class="select-text"
                >项目地址：
                <div class="space-x-10 text-red-300 hover:[&>a]:text-purple-600">
                  <a href="https://github.com/jeffhuien/musicBox123"
                    >https://github.com/jeffhuien/musicBox123</a
                  >
                  <a href="https://gitee.com/jeffhuien/musicBox123"
                    >https://gitee.com/jeffhuien/musicBox123</a
                  >
                </div>
              </div>
              <div>
                项目描述：音乐小站是一个基于Vue3的即时在线音乐平台项目、结合了最新的前端技术和设计理念、致力于提供用户
                全方位的音乐体验。项目界面美观、交互
                流畅、旨在为用户打造一个优质的音乐聆听平台。
              </div>
              <div>
                责任描述：
                1.独立开发音乐小站前端项目、负责项目的整体架构设计和前端技术选型。
                2.使用Vue3、ElementPlus、Pinia、TypeScript等技术栈、搭建用户端平台
                3.设计并实现各平台的页面布局、交互逻辑和数据展示、保证用户体验和功能完整性。
                4.使用Vue-Router实现前端路由管理、确保页面之间的流畅切换和导航。
                5.使用Axios进行数据请求和响应处理、与后端接口进行数据交互。
                6.利用TailwindCss和Sass进行页面样式设计和布局、实现页面的响应式和美观性。
                7.集成animate.css实现页面元素的动画效果、提升用户体验和视觉吸引力。
                8.负责项目的前端开发和调试工作、保证代码质量和项目进度、及时解决出现的技术难题和bug。
                9.与后端开发人员紧密合作、协调前后端接口的定义和数据格式、确保前后端数据的一致性和稳定性
              </div>
              <div>
                技术栈：Vue3全家桶、Vite、ElementPlus 、TypeScript, TailwindCss
                、Sass、Axios、animate.css、Nginx
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<style scoped lang="scss"></style>
