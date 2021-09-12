let http = require('http');
//Content-Encoding: gzip 服务端
// Accept-Encoding: gzip, deflate, br 客户端
let path = require('path');
let fs = require('fs');
let zlib = require('zlib');
let server = http.createServer(function (req, res) {
    let p = path.join(__dirname, '1.txt');
    let header = req.headers['accept-encoding'];
    res.setHeader('Content-Type','text/html;charset=utf8');
    if (header) {
        if (header.match(/\bgzip\b/)) {
            let gzip = zlib.createGzip();
            res.setHeader('Content-Encoding','gzip');
            fs.createReadStream(p).pipe(gzip).pipe(res);
        } else if (header.match(/\bdeflate\b/)) {
            let deflate = zlib.createDeflate();
            res.setHeader('Content-Encoding','deflate')
            fs.createReadStream(p).pipe(deflate).pipe(res);
        }else{
            fs.createReadStream(p).pipe(res);
        }
    }else{
        fs.createReadStream(p).pipe(res);
    }
}).listen(8080);