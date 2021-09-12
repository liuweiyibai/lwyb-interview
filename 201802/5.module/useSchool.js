// commonjs规范 规定了每一个文件都是一个模块，模块之间是相互独立

// 规范规定了 导出的时候 module.exports
// 定义了 如何引用一个模块 require

// 一个模块外面给你加了一个闭包 (function(exports,require,module,__dirname,__filename){})
// 模块可以省略后缀 如果是js或者json或者node文件可以省略后缀
let result = require('./school');
// 同步读取，并且为了节约性能 还有缓存 将module.exports后面的结果进行缓存，如果有直接把缓存返回回去
result = require('./school');
console.log(result);