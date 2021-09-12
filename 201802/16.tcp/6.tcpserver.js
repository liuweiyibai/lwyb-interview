let net = require('net');

let server = net.createServer(function(socket){
    socket.setEncoding('utf8');
    socket.on('data',function(data){
        console.log(data);
        socket.write('你好');
    });
});

server.on('connection',function(){
    console.log('客户端连接')
})
server.listen(8080);