let {fork} = require('child_process');
let path = require('path');
let child = fork('http.js',{
    cwd:path.join(__dirname,'test')
});
let http = require('http');

let server = http.createServer(function(req,res){
    res.end('父进程接收处理请求')
}).listen(3000);

child.send('server',server);