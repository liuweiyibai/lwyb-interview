// server
let dgram = require('dgram');


let socket = dgram.createSocket('udp4');
// 监听一个端口 数据到来时 可以读出信息
socket.bind(8080,'localhost',function(){
    socket.on('message',function(data,rinfo){
        console.log(data.toString());
        socket.send('hello',rinfo.port);
    })
});