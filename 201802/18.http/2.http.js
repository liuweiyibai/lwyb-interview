let http = require('http'); 
// 核心模块

// let server = http.createServer(function(req,res){

// });
// http是基于tcp的

// POST / HTTP/1.1
// > Host: www.baidu.com
// > User-Agent: curl/7.46.0
// > Accept: */*
// > Content-Length: 11
// > Content-Type: application/x-www-form-urlencoded

let server = http.createServer();
// curl 可以帮我们发http请求
// req是请求 是一个可读流 = socket
// res是响应 是一个可写流
server.on('request',function(req,res){
    let method = req.method;
    let httpVersion  = req.httpVersion;
    let url = req.url;
    let headers = req.headers; // 请求头的名字都是小写的
    console.log(method,httpVersion,url,headers);
    // 如果数据 大于64k data事件可能会触发多次
    let buffers = [];
    // 如果没有请求体 不会走on('data'),没有请求体也会触发end事件
    req.on('data',function(data){
        console.log(1)
        buffers.push(data);
    });

    req.on('end',function(){
        console.log(Buffer.concat(buffers).toString());
        // socket.write socket.end
        res.write('hello');
        res.end('world');
    });
});
// 监听请求的到来
server.on('connection',function(socket){
    console.log('建立连接');
});
server.on('close',function(){
    console.log('服务端关闭')
})
server.on('error',function(err){
    console.log(err);
});


server.listen(8080);