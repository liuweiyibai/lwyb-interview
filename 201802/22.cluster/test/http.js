let http = require('http');
process.on('message',function(msg,server){
    http.createServer(function(req,res){
        res.end('子进程接收处理请求')
    }).listen(server);
})



