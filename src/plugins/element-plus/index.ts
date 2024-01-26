import { App } from 'vue'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'

export default function setupElementPlus(app: App) {
  app.use(ElementPlus)
}
