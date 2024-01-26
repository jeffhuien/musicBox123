import piniaToLocal from '@/utils/piniaToLocal'
import { createPinia } from 'pinia'
import { App } from 'vue'

export default function setupPinia(app: App) {
  const pinia = createPinia()
  pinia.use(piniaToLocal)
  app.use(pinia)
}
