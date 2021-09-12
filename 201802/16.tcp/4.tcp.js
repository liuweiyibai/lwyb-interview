let net = require('net');
// 希望客户端访问服务端时 服务可以将一个文件发送给客户端
let rs = require('fs').createReadStream(__dirname+'/1.txt');
let server = net.createServer(function(socket){
    rs.on('data',function(chunk){
        let flag = socket.write(chunk);
        console.log(flag);
        console.log('缓存区的大小'+socket.bufferSize);
    });
    socket.on('drain',function(){
        console.log('抽干')
    })
});
server.listen(8080);



// let fs = require('fs');

// fs.writeFileSync(__dirname+'/1.txt',Buffer.alloc(1024*1024*10));