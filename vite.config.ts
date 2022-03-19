import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'

const pathResolve = (dir: string) => resolve(__dirname, dir)

export default defineConfig({
  base: process.env.ELECTRON == 'true' ? './' : './',
  plugins: [vue(), vueJsx({})],
  resolve: {
    alias: {
      '@': pathResolve('src')
    }
  },
  css: {
    // css预处理
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import "./src/style/global.less";' // 加载全局样式，使用less特性
      }
    }
  },
  server: {
    port: 3000,
    open: false,
    proxy: {
      '/api': {
        target: 'https://api.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
