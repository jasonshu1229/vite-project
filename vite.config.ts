import { defineConfig, normalizePath } from "vite";
import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer"; // 自动添加浏览器前缀
import path from "path";

// 引入全局scss变量的路径
// normalizePath 用于将 Windows 风格的路径转换为 Unix 风格的路径
const sassVariablePath = normalizePath(
  path.resolve("./src/assets/css/variable.scss")
);
const lessVariablePath = "./src/styles/var.less";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      scss: {
        // additionalData 的内容会在每个scss文件的最前面自动插入
        additionalData: `@import "${sassVariablePath}";`,
      },
      less: {
        javascriptEnabled: true, // less 3.0 开始默认不支持javascript表达式，需要手动设置
        additionalData: `@import "${lessVariablePath}";`,
      },
      postcss: {
        plugins: [
          autoprefixer({
            // 指定目标浏览器
            overrideBrowserslist: ["> 1%", "last 2 versions"],
          }),
        ],
      },
    },
    modules: {
      // 通过 generateScopedName 自定义生成的类名
      // name 为文件名，local 为类名，hash 为哈希值
      generateScopedName: "[name]___[local]___[hash:base64:5]",
    },
  },
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-styled-components"],
      },
    }),
  ],
});
