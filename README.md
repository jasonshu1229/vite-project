## 在 Vite 中接入现代化的 CSS 工程化方案

在 Vite 中介入现代化的 CSS 工程化方案。

针对原生 CSS 的痛点，社区中诞生了不少解决方案，常见的有 5 类。

1. `CSS 预处理器`：主流的包括`Sass/Scss`、`Less`和`Stylus`，这些方案各自定义了一套语法，让 CSS 也能使用嵌套规则，甚至能像编程语言一样定义变量、写条件判断和循环语句，大大增强了样式语言的灵活性。
2. `CSS Modules`：能将 CSS 类名处理成哈希值，这样就可以避免同名的情况下样式污染的问题。
3. CSS 后处理器`PostCSS`，用来解析和处理 CSS 代码，可以实现的功能非常丰富，比如将`px`转换为`rem`，根据目标浏览器情况自动加上类似于`--moz--`、`-o-`的属性前缀等等。
4. `CSS in JS`方案，主流的包括`emotion`、`styled-components`等等，顾名思义，这类方案可以实现直接在 JS 中写样式代码，基本包含`CSS 预处理器`和`CSS Modules`的各项优点，非常灵活，解决了开发体验和全局样式污染的问题。
5. CSS 原子化框架，如`Tailwind CSS`、`Windi CSS`，通过类名来指定样式，大大简化了样式写法，提高了样式开发的效率，主要解决了原生 CSS **开发体验**的问题。

下面针对上面提到的集中方案，分配记录它们是如何配置的。

### CSS 预处理器

```bash
pnpm i sass less -D
```

```ts
// 引入全局scss变量的路径
// normalizePath 用于将 Windows 风格的路径转换为 Unix 风格的路径
const sassVariablePath = normalizePath(
  path.resolve("./src/assets/css/variable.scss")
);
const lessVariablePath = "./src/styles/var.less";

export default defineConfig({
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
    },
  },
});
```

### CSS Modules

在 Main 下新建`index.module.scss`，引入全局变量`$theme-color`

```scss
.main {
  color: $theme-color;
}
```

```ts
// 引入全局scss变量的路径
// normalizePath 用于将 Windows 风格的路径转换为 Unix 风格的路径
const sassVariablePath = normalizePath(
  path.resolve("./src/assets/css/variable.scss")
);
const lessVariablePath = "./src/styles/var.less";

export default defineConfig({
  css: {
    preprocessorOptions: {
      // 省略css预处理器配置
    },
    modules: {
      // 通过 generateScopedName 自定义生成的类名
      // name 为文件名，local 为类名，hash 为哈希值
      generateScopedName: "[name]___[local]___[hash:base64:5]",
    },
  },
});
```
