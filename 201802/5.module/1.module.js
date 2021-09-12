// 模块分为三个大类
// 先不考虑 第三方模块

// 核心模块、内置模块 
// 1)内置模块就是不需要./ 或者 ../可以直接引用  不需要下载 天生自带
// 文件模块、自定义模块 这个就是我们自己写的

// fs里面有一个新增 判断文件是否存在
let fs = require('fs'); // fs.readFile fs.readFileSync
fs.accessSync('./5.module/1.txt'); // 文件找到了就不会发生任何异常

// 解决路径问题
let path = require('path');
// resolve方法你可以给他一个文件名，他会按照当前运行的路径 给你拼出一个绝对路径
// __dirname 当前文件所在的文件的路径 他和cwd有区别
console.log(path.resolve(__dirname,'a')); // 解析绝对路径
console.log(path.join(__dirname,'a')); // join就是拼路径用的 可以传递多个参数
// 获取基本路径 
console.log(path.basename('a.js','.js')); // 经常用来 获取除了后缀的名字
console.log(path.extname('a.min.js')); // 获取文件的后缀名（最后一个.的内容）
console.log(path.posix.delimiter); // window下是分号  maclinux 是:
console.log(path.sep);  // window \  linux /

// vm 虚拟机 模块 runinThisContext
let vm = require('vm'); // eval是依赖于环境的

var a  =1 ;
vm.runInThisContext(`console.log(${a})`);