// client
let dgram = require('dgram');


let socket = dgram.createSocket('udp4');
socket.send('珠峰',8080,function(){
    console.log('成功')
});

socket.on('message',function(data){
    console.log(data.toString());
})