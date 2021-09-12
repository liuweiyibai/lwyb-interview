// 获取范围请求
let http = require('http');
let fs = require('fs');
let path = require('path');
let { promisify } = require('util');
let stat = promisify(fs.stat);
// 客户端要发一个头Range:bytes=0-10
// 服务端返回一个头
// Accept-Ranges:bytes
// Content-Range:0-10/总大小
let server = http.createServer(async function (req, res) {

    let p = path.join(__dirname, 'content.txt');
    // 判断当前文件的大小
    let statObj = await stat(p);
    let start = 0;
    let end = statObj.size - 1; // 读流是包前又包后的
    let total = end
    let range = req.headers['range'];
    if (range) {
        // 告诉它支持范围请求
        res.setHeader('Accept-Ranges','bytes');
        // ['匹配的字符串','第一个分组']
        let result = range.match(/bytes=(\d*)-(\d*)/);
        start = result[1]?parseInt(result[1]):start;
        end = result[2]?parseInt(result[2])-1:end;
        // 获取成功并且文件总大小是多少
        res.setHeader('Content-Range',`${start}-${end}/${total}`)
    }
    res.setHeader('Content-Type', 'text/plain;charset=utf8');
    fs.createReadStream(p, { start, end }).pipe(res);
});
server.listen(3000);