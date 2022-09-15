import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname)
  return {
    plugins: [vue()],
    server: {
      open: true,
      proxy: {
        "/api": {
          target: "http://gmall-h5-api.atguigu.cn",
          changeOrigin: true,
          pathRewrite: { "^/api": "api" }
        }
      },
    },
    base: env.VITE_MODE === 'production' ? './' : '/',
    resolve: {
      alias: {
        //resolve.alias设置别称 解决@绝对路径引入问题
        "@": path.resolve(__dirname, 'src'),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@components": path.resolve(__dirname, "src/components"),
        "@images": path.resolve(__dirname, "src/assets/imags"),
        "@pages": path.resolve(__dirname, "src/pages"),
        "@store": path.resolve(__dirname, "src/store"),
      },
    },
    build: {
      outDir: "dist",
      assetsDir: "assets", //指定静态资源存放路径
      sourcemap: false, //是否构建source map 文件
      // terserOptions: {
      //   // 生产环境移除console
      //   compress: {
      //     drop_console: true,
      //     drop_debugger: true,
      //   },
      // },
    },
  }
})
