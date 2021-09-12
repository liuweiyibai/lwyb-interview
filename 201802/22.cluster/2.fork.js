let {fork} = require('child_process');
let path = require('path');
let child = fork('socket.js',{
    cwd:path.join(__dirname,'test')
});
let net = require('net');

let server = net.createServer(function(socket){
    if(Math.random()>0.5){
        socket.write('father');
    }else{
        child.send('socket',socket);
    }
}).listen(3000);

