import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  VitePWA(),
  Components({
    resolvers: [VantResolver()],
  }),
  ],
  
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: './',
  server: {
    https: false, //(使用https)启用 TLS + HTTP/2。注意：当 server.proxy 选项 也被使用时，将会仅使用 TLS
    host: "0.0.0.0", // 监听所有地址
    port: 8080, //指定开发服务器端口：默认3000
    open: process.platform === 'darwin', //启动时自动在浏览器中打开
    cors: true, //为开发服务器配置 CORS
    proxy: {
      //配置自定义代理规则
      // 字符串简写写法
      '/api': {
        target: '',
        changeOrigin: true, //是否跨域
        ws: true,
        rewrite: (path: any) => path.replace(/^\/api/, "")
      }
    }
  },


})
