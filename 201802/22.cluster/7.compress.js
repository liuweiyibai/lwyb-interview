//Content-Encoding: gzip 服务端
// Accept-Encoding: gzip, deflate, br 客户端

let fs = require('fs');
let path = require('path')
let zlib = require('zlib');

function zip(src){
    // 压缩流 转化流
    let gzip = zlib.createGzip();
    fs.createReadStream(src).pipe(gzip).pipe(fs.createWriteStream(src+'.gz'))
}
// zip(path.join(__dirname,'./1.txt'));
function unzip(src){
    let gunzip = zlib.createGunzip();
    fs.createReadStream(src)
    .pipe(gunzip)
    .pipe(fs.createWriteStream(path.basename(src,'.gz')));
}
unzip(path.join(__dirname,'./1.txt.gz'));
