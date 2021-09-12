// node 为了实现tcp 提供了一个模块 模块叫net模块
// 和http用法一致

let net = require('net');
// 创建一个tcp服务 里面放的是回调函数 监听函数，当连接到来时才会执行
// socket 套接字 是一个duplex 可以支持读操作和写操作
let server = net.createServer(function(socket){
    // 最大连接数2个
    // 希望每次请求到来时都一个提示 当前连接了多少个 一共连接多少个
    server.maxConnections = 2;
    server.getConnections(function(err,count){
        // socket每次连接时都会产生一个新的socket
        socket.write(`当前最大容纳${server.maxConnections},现在${count}人`)
    });
    socket.setEncoding('utf8');
    socket.on('data',function(data){
        console.log(data);
        // socket.end(); // 触发客户端的关闭事件
        // close事件表示服务端不在接收新的请求了，当前的还能继续使用，当客户端全部关闭后会执行close事件
        // server.close();
        // 如果所有客户端都关闭了，服务端就关闭，如果有人进来仍然可以
        server.unref();
    });
    socket.on('end',function(){
        console.log('客户端关闭');
    });
    // 请求到来时会触发这个函数
    // socket时一个可读可写
});
// backlog默认511
let port = 8080;
// 如果端口号被占用了怎么办
server.listen(port,'localhost',function(){
    console.log(`server start ${port}`)
});
// 当服务端发生错误时，close事件只有调用close方法才会触发
server.on('close',function(){
    console.log('服务端关闭');
})
server.on('error',function(err){
    if(err.code === 'EADDRINUSE'){
        server.listen(++port)
    }
});