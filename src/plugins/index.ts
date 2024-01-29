import setupPinia from '@/plugins/pinia'
// import setupElMessage from './ElMessage'
import { App } from 'vue'
import setupMarquee from './marquee'
import setupRouter from './router'

export default function setupPlugins(app: App) {
  console.log('安装插件')
  setupRouter(app) // 路由必须在pinia之前注册
  setupPinia(app)
  // setupElMessage(app)
  setupMarquee(app)
}
