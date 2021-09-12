let http = require('http');
// node可以做爬虫
let options = {
    hostname:'localhost',
    port:4000,
    path: '/',
    method:'get',
    // 告诉服务端我当前要给你发什么样的数据
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Content-Length':15
    }
}
let req = http.request(options);
// 前后端通信 靠的都是json字符串
req.on('response',function(res){
    res.on('data',function(chunk){
        console.log(chunk);
    });
});
req.end('name=zfpx&&age=9');
//req.end('{"name":"zfpx"}');
