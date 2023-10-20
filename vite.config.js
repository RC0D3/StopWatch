import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  let url = '/'
  if (mode !== 'development') {
    url = '/StopWatch/'
  }
  return {
    base: url,
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => ['swiper-container', 'swiper-slide'].includes(tag),
          }
        }
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
