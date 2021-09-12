let fs = require('fs');

let path = require('path');
let ReadStream = require('./ReadStream');
let rs = fs.createReadStream(path.join(__dirname,'./1.txt'),{
    flags:'r',
    autoClose:true,
    encoding:'utf8',
    start:0,
    highWaterMark:3 
});
// 默认会先读满
// 当缓存区为空时 会默认再去触发readable事件
// 不满混存区就再去读取
rs.on('readable',function(){
    // 我想读五个 缓存区只有3个 他会更改缓存区的大小再去读取
    let result =  rs.read(5);
    console.log(result);
});
