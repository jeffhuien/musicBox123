/*
 * @Author: GAO GAO
 * @Date: 2023-09-05 18:11:52
 */
import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import setupPlugins from './plugins'
import '@/utils/shortCut'
const app = createApp(App)

setupPlugins(app)

app.mount('#app')
