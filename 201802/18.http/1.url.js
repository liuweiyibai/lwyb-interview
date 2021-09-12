let url = require('url');
let u = 'http://jiangwen:xxxx@www.baidu.com:80/abc/index.html?a=1&b=2#hash';

// 可以将查询字符串转化成对象
let urlObj = url.parse(u,true);
console.log(urlObj.query); // 查询字符串
console.log(urlObj.pathname); //  路径

// 请求头 和请求体有一个空行
// 请求体之间也可能有空行


// RESTful 风格