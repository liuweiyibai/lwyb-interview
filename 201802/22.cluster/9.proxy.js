// 正向代理 
// 反向代理

//  访问  google.com

// http-proxy;
let httpProxy = require('http-proxy');
let http = require('http');
// 创建代理服务器
let proxy = httpProxy.createProxyServer();
http.createServer(function(req,res){
    proxy.web(req,res,{
        target:'http://localhost:8000'
    });
}).listen(3000);

// 虚拟主机