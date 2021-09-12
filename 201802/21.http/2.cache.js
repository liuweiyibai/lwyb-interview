let http = require('http');
let url = require('url');
let path = require('path');
let fs = require('fs');
let mime = require('mime');
let server = http.createServer(function (req, res) {
    let { pathname } = url.parse(req.url);
    let p = path.join(__dirname, 'public', '.' + pathname);
    fs.stat(p, function (err, stat) {
        // 第一次你来的时候给你一个表示 下次你在来的时候会带上这个表示
        // 这次你来的时候我用我的标识和你比如果有区别就返回新文件
        // 8:00 8：00 304
        // 9:00 8:00 这是就返回一个新文件
        // 根据修改时间判断
        // if-modified-since  Last-Modified
        if (!err) {
            let since = req.headers['if-modified-since'];
            if(since){
                if(since === stat.ctime.toUTCString()){
                    res.statusCode = 304;
                    res.end();
                }else{
                    sendFile(req,res,p,stat);
                }
            }else{
                sendFile(req,res,p,stat);
            }
        } else {
            sendError(res);
        }
    })
});
function sendError(res) {
    res.statusCode = 404;
    res.end();
}
function sendFile(req, res, p,stat) {
    res.setHeader('Cache-Control','no-cache')
    res.setHeader('Last-Modified',stat.ctime.toUTCString());
    res.setHeader('Content-Type', mime.getType(p) + ';charset=utf8')
    fs.createReadStream(p).pipe(res);
}
server.listen(8080);