import { App } from 'vue'
import router from '@/router'

export default function setupRouter(app: App) {
  app.use(router)
}
