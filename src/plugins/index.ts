import setupPinia from '@/plugins/pinia'
import { App } from 'vue'
import setupMarquee from './marquee'
import setupRouter from './router'
import setupAnimateCSS from './animateCss'
import setupElementPlus from './element-plus'
export default function setupPlugins(app: App) {
  console.log('安装插件')
  setupRouter(app) // 路由必须在pinia之前注册
  setupPinia(app)
  setupElementPlus(app)
  setupMarquee(app)
  setupAnimateCSS()
}
