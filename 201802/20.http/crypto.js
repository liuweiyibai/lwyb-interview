let crypto = require('crypto');
// 加密算法 ： 加密后可以解密
// md5 并不交加密算法，不可逆，摘要算法
// md5 1）不可逆 ， 2）不能同的内容输出的结果不同，3) 相同的内容输出的一定一样
// 4） 最终的加密结果长度一样
// console.log(crypto.getHashes());

// let md5 = crypto.createHash('md5');
// md5.update('123456');
// let result = md5.digest('hex');
// console.log(result);


// 一个非常大的文件
let md5 = crypto.createHash('md5');

let rs = require('fs').createReadStream(__dirname+'/content.txt',{highWaterMark:2});
rs.on('data',function(chunk){
    md5.update(chunk);
})
rs.on('end',function(){
    console.log(md5.digest('hex'));
});
//501574e9a457d6deb889f77de98ba263
// 可以采用多次update来更新大文件
let crypto = require('crypto')
let content = require('fs').readFileSync(__dirname+'/content.txt');
let md5 = crypto.createHash('md5');
console.log(md5.update(content).digest('hex'));
//501574e9a457d6deb889f77de98ba263


// Hmac 加盐算法 可以根据一个所谓的密钥来加密
let crypto = require('crypto');
let fs = require('fs');
let path = require('path');
let m = crypto.createHmac('sha1',fs.readFileSync(path.join(__dirname,'./content.txt')));
m.update('ok');
console.log(m.digest('hex'));

// 不可逆
// openssl genrsa -out rsa_private.key 1024


// 对称加密  用一把要是可以 加密也可以解密
let crypto = require('crypto');
let path = require('path');
let fs = require('fs')
let name = 'zfpx';
let private = fs.readFileSync(path.join(__dirname,'./rsa_private.key'))
let m = crypto.createCipher('blowfish',private);
m.update(name,'utf8');
let result = m.final('hex');
console.log(result)
//  881bad056f02cbff 加密后的结果
let r = crypto.createDecipher('blowfish',private);
r.update('881bad056f02cbff','hex');
console.log(r.final('utf8'));

// 非对称 2把钥匙 公钥和私钥 用公钥加密的 可以 用私钥来解密，相反也可以
// openssl rsa -in rsa_private.key -pubout -out rsa_public.key 

let crypto = require('crypto');
let fs = require('fs');
let path = require('path');
let public = fs.readFileSync(path.join(__dirname,'./rsa_public.key'))
let private = fs.readFileSync(path.join(__dirname,'./rsa_private.key'))
let p = crypto.publicEncrypt(public,Buffer('zfpx'));
let pri = crypto.privateDecrypt(private,p);
console.log(pri.toString());



//签名
// 甲 用RSA-SHA256 加密 createSign出一个签名,'字符串' 发给乙方
// 乙方用这个签名，和公钥进行验证 还有内容 看是不是同一个东西
// 为了鉴别甲方和乙方的数据是相同的
let crypto = require('crypto');
let fs = require('fs');
let path = require('path');
let public = fs.readFileSync(path.join(__dirname,'./rsa_public.key'))
let private = fs.readFileSync(path.join(__dirname,'./rsa_private.key'))
let s  = crypto.createSign('RSA-SHA256');
s.update('zfpx');
let signed = s.sign(private,'hex')
let v = crypto.createVerify('RSA-SHA256');
v.update('zfpx1');
console.log(v.verify(public,signed,'hex')); 
// 签名
// ctime+文件大小


// 对比缓存 
// 强制缓存



