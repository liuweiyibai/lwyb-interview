// 想读一点写一点

let fs = require('fs');
let path = require('path');
let ReadStream = require('./ReadStream');
let WriteStream = require('./WriteStream');
let rs = new ReadStream(path.join(__dirname,'./1.txt'),{
    highWaterMark:4
});
let ws = new WriteStream(path.join(__dirname,'./2.txt'),{
    highWaterMark:1
});
// 4 1
rs.pipe(ws); // 就是读一点写一点
// rs.on('data',function(chunk){ // chunk 读到的内容
//     let flag = ws.write(chunk);
//     if(!flag){
//         rs.pause();
//     }
// });
// ws.on('drain',function(){
//     console.log('干了')
//     rs.resume();
// });