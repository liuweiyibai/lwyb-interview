let fs = require('fs');

let ws = fs.createWriteStream('./1.txt',{
    flags:'w',
    mode:0o666,
    autoClose:true,
    highWaterMark:3, // 默认写是16k
    encoding:'utf8',
    start:0
});
// 写入的数据必须是字符串或者buffer
// flag代表是否能继续写
// 表示符表示的并不是是否写入 表示的是能否继续写，但是返回false 也不会丢失，就是会把内容放到内存中
let flag = ws.write(1+'','utf8',()=>{}); // 异步的方法
console.log(flag);
flag = ws.write(1+'','utf8',()=>{}); // 异步的方法
console.log(flag);
// flag = ws.write(1+'','utf8',()=>{}); // 异步的方法
// console.log(flag);

//ws.end('ok'); // 当写完后 就不能再继续写了
//ws.write('123'); //write after end
// 就两个方法 write end

// 抽干方法 当都写入完后会触发drain事件
// 必须缓存区满了 满了后被清空了才会出发drain
ws.on('drain',function(){
    console.log('drain')
});
// 可读流 配合可写流 写一个pipe方法


fs.read(文件描述符吗,读取到哪个buffer,内容从buffer的哪个位置上开始,读取文中内容的长度,读取文件的位置)