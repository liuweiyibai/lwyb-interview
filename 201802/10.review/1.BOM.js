// gb2312 一个汉字几个字符 

let fs = require('fs');
let path = require('path');
let index = require('./index')

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 * because the buffer-to-string conversion in `fs.readFileSync()`
 * translates it to FEFF, the UTF-16 BOM.
 */
function stripBOM(content) {
    if (Buffer.isBuffer(content)) {
        if (content[0] === 0xEF && content[1] === 0xBB && content[2] === 0xBF) {
            return content.slice(3)
        }
        return content;
    } else {
        if (content.charCodeAt(0) === 0xFEFF) {
            content = content.slice(1);
        }
        return content;
    }
}
// utf8 是unicode是他的实现
let result = fs.readFileSync(path.join(__dirname, './1.txt'), 'utf8');
result = stripBOM(result);
// 截取bom头
console.log(result.toString());


// 爬虫  淘宝可能就是gbk 把gbk转化程utf8
// iconv-lite
let iconv = require('iconv-lite'); // 这个模块就是一个解析其他编码的
let fs = require('fs');
let path = require('path');
let result = fs.readFileSync(path.join(__dirname, './2.txt'));
// 爬虫 我们会分析页面解构 根据编码类型来做处理
result = iconv.decode(result,'gbk');
console.log(result.toString());


// Buffer 的乱码问题
let buffer = Buffer.from('珠峰培训');
let buff1 =  buffer.slice(0,5);
let buff2 = buffer.slice(5);
let {StringDecoder} = require('string_decoder');
let sd = new StringDecoder();
console.log(sd.write(buff1).toString());
console.log(sd.write(buff2).toString());
// 模块来解决输出问题 string_decoder 我不识别的不输出 先攒着



// 全局安装 发布包(必须要有package.json)
// 通过命令行发布包
// npm adduser 如果有账号相当于是登录 没有就是注册 
// 账号只能再官方登录
// npm publish

// 全局安装
// npm link 可以把当前文件夹链接到全局目录下
// 好处就是边开发边测试
// 配置package.json 下的bin参数


// npm install  / npm add