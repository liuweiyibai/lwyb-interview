// fs fileSystem 文件系统 这里提供了很多方法 方法有同步的和异步的
// readFileSync readFile
// 异步的就多了一个callback callback的第一个参数是错误对象
let fs = require('fs');
let path = require('path');
// 同步的性能低 会阻塞主线程，能用异步就用异步 
// 读取文件的时候默认编码是null null代表的就是二进制
// fs.readFile(path.join(__dirname,'1.txt'),{flag:'r'},function(err,data){
//     if(err) return console.log(err);
//     console.log(data);
// });

// 以什么编码格式写入到文件内
// mode 权限 
// 二爷一直死读书
// 0o666 表示可读可写
// chmod -R 777 *
fs.writeFile('./2.txt','hello',{mode:0o666},function(err){
    console.log(err);
})
