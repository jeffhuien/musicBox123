import setupPinia from '@/plugins/pinia'
// import setupToast from './toast'
import { App } from 'vue'
import setupMarquee from './marquee'
import setupRouter from './router'

export default function setupPlugins(app: App) {
  console.log('安装插件')
  setupRouter(app) // 路由必须在pinia之前注册
  setupPinia(app)
  // setupToast(app)
  setupMarquee(app)
}
