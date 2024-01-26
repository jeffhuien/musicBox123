import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { VueUseComponentsResolver, ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { ConfigEnv, loadEnv } from 'vite'
import alias from './vite/alias'
import parseEnv from './vite/utils'

// https://vitejs.dev/config/

export default ({ command, mode }: ConfigEnv) => {
  const root = process.cwd()
  const env = parseEnv(loadEnv(mode, root))
  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [VueUseComponentsResolver(), ElementPlusResolver()],
        imports: ['vue', 'vue-router'],
        dts: 'types/auto-import.d.ts',
      }),
      Components({
        resolvers: [ElementPlusResolver(), VueUseComponentsResolver()],
        extensions: ['vue'],
        dts: 'types/components.d.ts',
      }),
    ],
    resolve: {
      alias,
    },

    server: {
      host: true,
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ''), // 不可以省略rewrite
        },
      },
    },
  }
}
