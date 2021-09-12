let path = require('path');
let debug = require('debug')('static:config');
// 启动服务的配置信息项
let config  = {
    hostname:'localhost',
    port:3000,
    dir:path.join(__dirname,'..','public')
}
module.exports = config