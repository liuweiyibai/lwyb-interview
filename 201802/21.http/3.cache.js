let http = require('http');
let url = require('url');
let path = require('path');
let fs = require('fs');
let mime = require('mime');
let crypto = require('crypto');
// 根据的是最新修改时间  这回根据的是文件的内容 111 111
// ETag:md5加密 / if-none-match
let server = http.createServer(function (req, res) {
    let { pathname } = url.parse(req.url);
    let p = path.join(__dirname, 'public', '.' + pathname);
    fs.stat(p, function (err, stat) {
        let md5 = crypto.createHash('md5');
        let rs = fs.createReadStream(p);
        rs.on('data',function(data){
            md5.update(data);
        });
        rs.on('end',function(){
            // stat.ctime+stat.size
            let r = md5.digest('hex'); // 当前文件的唯一标识
            // 下次再拿最新文件的加密值 和客户端请求来比较
            let ifNoneMatch = req.headers['if-none-match'];
            if(ifNoneMatch){
                if(ifNoneMatch === r){
                    res.statusCode = 304;
                    res.end();
                }else{
                    sendFile(req,res,p,r);
                }
            }else{
                sendFile(req,res,p,r);
            }
        });
    })
});
function sendError(res) {
    res.statusCode = 404;
    res.end();
}
function sendFile(req, res, p,r) {
    res.setHeader('Cache-Control','no-cache')
    res.setHeader('Etag',r);
    res.setHeader('Content-Type', mime.getType(p) + ';charset=utf8')
    fs.createReadStream(p).pipe(res);
}
server.listen(8080);