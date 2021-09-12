
let net = require('net');

let socket = net.createConnection({port:8080},function(){
    socket.write('hello');
    socket.on('data',function(data){
        console.log(data);
    });
});

// tcp udp