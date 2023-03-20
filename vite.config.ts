import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 8081,
    host: '0.0.0.0',
    proxy: {
      '^/api': {
        target: 'http://localhost:8002',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api")
      },
      '^/file': {
        target: 'http://localhost:8002',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/file/, "/file")
      },
      '^/aboutfile': {
        target: 'http://localhost:8002',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/aboutfile/, "/aboutfile")
      },
    }
  },
})


/* 

proxy: {
      '^/api': {
        target:'http://localhost:8002/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      },
      '^/file': {
        target:'http://localhost:8002/file',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/file/, "")
      },
      '^/aboutfile': {
        target:'http://localhost:8002/aboutfile',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/aboutfile/, "")
      },
    }




*/
