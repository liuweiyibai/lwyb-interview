// write end on('drain')
let fs = require('fs');
let path = require('path');

// 写的时候文件不存在 会创建文件
let ws = fs.createWriteStream(path.join(__dirname,'1.txt'),{
    highWaterMark:3,
    autoClose:true,
    flags:'w',
    encoding:'utf8',
    mode:0o666,
    start:0,
});
// 写内容的时候 必须是字符串或者buffer
for(var i = 0;i<9;i++){
   let flag =  ws.write(i+''); // 第一次写一个字符
   console.log(flag)
}
// 当文件被清空的时候才会改成true