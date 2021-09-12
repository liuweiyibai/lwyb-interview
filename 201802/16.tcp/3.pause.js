let net = require('net');
// 等待客户端输入 过个2s 在打印出来
let server = net.createServer(function(socket){ // duplex
    socket.pause(); // 暂停触发data事件
    // 超时 当客户端多长事件不访问也可以触发一个函数，一般情况下 当时间到达后 我们可以关闭客户都按
    socket.setTimeout(5000);
    socket.on('data',function(chunk){
        socket.pause();
        console.log(chunk);
    })
    socket.on('timeout',function(){
        socket.resume();
        // socket.end();
    });
});
server.listen(8080);