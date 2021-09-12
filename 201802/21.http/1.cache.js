// 对比缓存  它需要每次请求的时候对比一下
// 强制缓存 设置两个头（第一次访问的时候走我们的服务器，在一段时间内以后都不走了）
// Expires 过期时间http1.0 设置的都是绝对时间
// Cache-Control：相对时间
//当访问 localhost:8080/a.js
let http = require('http');
let url = require('url');
let path = require('path');
let fs = require('fs');
let mime = require('mime');
let server = http.createServer(function(req,res){
   let {pathname} =  url.parse(req.url);
   console.log(pathname);
   let p = path.join(__dirname,'public','.'+pathname);
   fs.stat(p,function(err,stat){
        if(!err){
            sendFile(req,res,p);
        }else{
            sendError(res);
        }
   })
});
function sendError(res){
    res.statusCode = 404;
    res.end();
}
function sendFile(req,res,p){
    let date = new Date(Date.now()+10*1000);
   // res.setHeader('Expires',date.toUTCString());
    res.setHeader('Cache-Control','max-age=10');
    res.setHeader('Content-Type',mime.getType(p)+';charset=utf8')
    fs.createReadStream(p).pipe(res);
}
server.listen(8080);