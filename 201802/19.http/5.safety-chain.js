let fs = require('fs');
let path = require('path');
let http = require('http');
let url = require('url');
let getHostName = (str) => {
    let {hostname} = url.parse(str,true);
    return hostname;
}
// 白名单  可以允许 某个域名访问这张图片
let whitList = ['www.zf2.cn']
let server = http.createServer(function (req, res) {
    let refer = req.headers['referer'] || req.headers['referrer'];
    // 先看一下啊refer的值 ，还要看图片的请求路径
    // 要读取文件 返回给客户端
    let {pathname} = url.parse(req.url,true);
    let p = path.join(__dirname,'public','.'+pathname);
    // p代表我要找的文件
    fs.stat(p,function(err){ // 判断请求的文件到底有没有啊？
        if(!err){
            if(refer){
                let referHostName = getHostName(refer);
                let host = req.headers['host'].split(':')[0];
                if(referHostName!=host && !whitList.includes(referHostName)){
                    // 防盗链
                    fs.createReadStream(path.join(__dirname,'public','./2.jpg')).pipe(res);
                }else{
                    // 正常显示
                    fs.createReadStream(p).pipe(res);
                }
            }else{
                // 正常显示
                fs.createReadStream(p).pipe(res);
            }
        }else{
            res.end();
        }
    })
}).listen(9999);