let http = require('http');

let server = http.createServer(function(req,res){
    // write方法不能再end之后调用
    // res.write()
    // res.end()
    // 响应可以设置响应头

    // 默认情况下返回给客户端内容 200
    //res.statusCode = 200;
    //res.setHeader('Content-Type','text/plain');
    //res.setHeader('name','zfpx');
    // 取响应头,不会真正的把响应头写给客户端
    
    res.writeHead(404,{'Content-Type':'text/plain'});
    // res.setHeader('a','1')不能再writeHead中设置响应头
    console.log(res.headersSent);
    // console.log(res.getHeader('name'));
    // console.log(res.removeHeader('name'));

    res.sendDate = false;
    // 调用write之前才能调用setHeader方法
    // Content-Length:2
  
    res.end('ok');

}).listen(3000);

