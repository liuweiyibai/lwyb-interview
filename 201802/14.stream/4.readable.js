let fs = require('fs');
let path = require('path');
let rs = fs.createReadStream(path.join(__dirname,'1.txt'),{
    highWaterMark:3
});

// rs.on('data');
// 当我只要创建一个流 就会先把缓存区 填满，等待着你自己消费
// 如果当前缓存区被清空后会再次触发readable事件
// 当你消费小于 最高水位线时 会自动添加highWater这么多数据
rs.on('readable',function(){
    let result = rs.read(1);
    console.log(rs._readableState.length); // 缓存区的个数
    setTimeout(function(){
        console.log(rs._readableState.length);
    },1000)
});