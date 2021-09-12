let options = {
    hostname:'localhost',
    port:3000,
    path:'/',
    method:'GET'
}
let fs = require('fs');
let path = require('path');
let http = require('http');
let ws = fs.createWriteStream('./download.txt');
let pause = false;
let start = 0;
// 下载，每次获取10个
process.stdin.on('data',function(chunk){
    chunk = chunk.toString();
    if(chunk.includes('p')){
        pause = true
    }else{
        pause = false;
        download();
    }
});
function download(){
    options.headers = {
        Range:`bytes=${start}-${start+10}`
    }
    start+=10;
    // 发请求
    // 0-10
    http.get(options,function(res){
        let range = res.headers['content-range'];
        let total = range.split('/')[1];
        let buffers = [];
        res.on('data',function(chunk){
            buffers.push(chunk);
        });
        res.on('end',function(){
            //将获取的数据写入到文件中
            ws.write(Buffer.concat(buffers));
            setTimeout(function(){
                if(pause === false&&start<total){
                    download();
                }   
            },1000)
        })
    })
}
download();
