# JavaScript 模块化实现

## require

```ts
function require(path: string) {
 // 假设 有个load方法可以读取到path文件内容
 // var code = load(path)

 // 文件内容如下
 var code = 'function add(a, b) { return a + b }; module.exports = add'

 // 代码块内部的 module 是个形参，实参使我们定义的context对象，对象中有一个 exports 属性
 code = `(function(module){
   ${code}
 })(context)`

 let context = {}
 const run = new Function('context', code);
 console.log(run)
//  run(context,code)
}
```

## 尝试阅读真实require.js 源码


/**
 * nodeJS 模块化实现
 * Node中的模块引入会经历下面几个步骤：

    路径分析
    文件定位
    编译执行
 */

/**
 * RequireJS
 * 通过 define 定义 和 require 来使用
 */

/**
 * 实现 CommonJS
 */

/**
 * 简易的 webpack
 */
