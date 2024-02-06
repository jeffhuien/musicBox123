// import piniaToLocal from '@/utils/piniaToLocal'
import { createPinia } from 'pinia'
import { App } from 'vue'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
export default function setupPinia(app: App) {
  // pinia.use(piniaToLocal)
  pinia.use(piniaPluginPersistedstate)
  app.use(pinia)
}

export { pinia }
