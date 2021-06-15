# webpack 面试题

- 简述前端性能有优化

  优化方向很多，主要是页面加载速度，用户体验等。
  资源加载采用域名拆分、使用 h2、拆分大的文件，文件 gzip，利用 cdn、文件图片懒加载、资源按需加载等。还有一些利用产品手段的方式，包括骨架屏、loading 等。可以采用服务端渲染的方式。资源预预加载等。合理的缓存策略（协商缓存）

- 什么是 webpack

  静态模块处理器，根据入口递归构建依赖图，完后根据配置的依赖关系生成产物包。

- 核心概念

  entry、output、loaders、plugins、module、chunk

- 常见 loader 和 plugins

  file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件

  source-map-loader：加载额外的 Source Map 文件，以方便断点调试

  image-loader：加载并且压缩图片文件

  babel-loader：把 ES6 转换成 ES5

  css-loader：加载 CSS，支持模块化、压缩、文件导入等特性

  eslint-loader：通过 ESLint 检查 JavaScript 代码

  define-plugin：定义环境变量

  commons-chunk-plugin：提取公共代码

  uglifyjs-webpack-plugin：通过 UglifyES 压缩 js 代码

  terser-webpack-plugin 通过 terser 压缩 es6 代码

## webpack 构建过程

1. 初始化

   启动构建，读取合并参数，加载 plugins ，实例化一个 complier

2. 编译

   从入口出发，针对于每一个 module 串行调用对应 loader 去解析文件内容，再找到该模块依赖的模块，递归进行编译处理

3. 输出

   对编译的模块组合成产物，输出到文件系统

4. webpack 配置，loader 和 plugin 区别。如何去掉冗余的代码？

   loader 是针对于不同文件类型执行不同的处理，属于文件处理流程，plugin 可以跨这个 webpack 运行周期，在一些周期内执行不同的函数完成不同的功能

5. tree-shaking 实现原理

   只能在 esModules 下使用，因为 esModules 的静态分析可以使代码不能行就能分析出不需要的代码。ECMAScript 6 模块加载是静态的，因此整个依赖树可以被静态地推导出解析语法树。所以在 ES6 中使用 tree shaking 是非常容易的。
   ES6 Module 引入进行静态分析，故而编译的时候正确判断到底加载了那些模块
   静态分析程序流，判断那些模块和变量未被使用或者引用，进而删除对应代码

6. 按需加载
7. 增量构建
8. 浏览器缓存
9. 用过 vite 吗，vite 和 webpack 相比
10. vite 为什么这么快

11. 你都用过哪些 webpack 的配置
12. 在你的项目里面用过哪些优化
13. plugin 和 loader 的区别
14. webpack loader 执行顺序
    从左到右，从下到上

15. sourcemap 原理知道吗？
