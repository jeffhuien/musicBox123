import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/src/themes/bootstrap/index.scss'

// export default function setupToast(app: App) {
//   app.use(ToastPlugin, {
//     position: 'top',
//     duration: 2000,
//     dismissible: true,
//     type: 'info',
//   })
// }

const toast = useToast({
  position: 'top',
  duration: 2000,
  dismissible: true,
  type: 'info',
})

export { toast }
