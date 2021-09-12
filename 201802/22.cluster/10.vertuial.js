let httpProxy = require('http-proxy');
let http = require('http');
// 创建代理服务器
let proxy = httpProxy.createProxyServer();
let hosts = {
    'www.zf1.cn':'http://localhost:5000',
    'www.zf2.cn':'http://localhost:8000',

}
http.createServer(function(req,res){
   let host = req.headers['host'];
   proxy.web(req,res,{
       target:hosts[host]
   })
}).listen(80);