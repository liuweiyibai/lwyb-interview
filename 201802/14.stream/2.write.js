let fs = require('fs');
let path = require('path');
let WriteStream = require('./WriteStream')
let ws = new WriteStream(path.join(__dirname,'1.txt'),{
    highWaterMark:3,
    autoClose:true,
    flags:'w',
    encoding:'utf8',
    mode:0o666,
    start:0,
});
let i = 9;
function write(){
    let flag = true;
    while(i>0&&flag){
        flag = ws.write(--i+'','utf8',()=>{console.log('ok')});
        console.log(flag)
    }
}
write();
// drain只有当缓存区充满后 并且被消费后触发
ws.on('drain',function(){
    console.log('抽干')
    write();
});