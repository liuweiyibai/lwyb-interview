# Babel

1. Babel 是什么，有什么作用

   Babel 是一个 es6 转码器，可以将 es6 代码转为 es5 代码，以便兼容那些还没支持 es6 的平台。其主要流程是解析->转译->生成的过程，主要是对 es6 语法进行抽象解析

2. Babel 的转译过程分为哪些阶段

   分三个阶段，分别是：

   1. 解析
      解析过程就是将代码解析为抽象语法树，简单来说就是一个对于 js 代码的一个编译过程，进行了词法分析与语法分析的过程
   2. 转化
   3. 生成

3. 有没有自己手写过 Babel 的插件，过程是怎样的

4. babel-polyfill 作用是什么

   Babel 默认只转换新的 JavaScript 句法（syntax），而不转换新的 API，比如 Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign）都不会转码。

   举例来说，ES6 在 Array 对象上新增了 Array.from 方法。Babel 就不会转码这个方法。如果想让这个方法运行，必须使用 babel-polyfill，为当前环境提供一个垫片。

   Babel 默认不转码的 API 非常多，详细清单可以查看 babel-plugin-transform-runtime 模块的 definitions.js 文件。
