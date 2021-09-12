// koa自己封装的
let url = require('url');
let request = {
    get query(){
        return url.parse(this.req.url,true).query;
    },
    get method(){
        return this.req.method;
    }
}
module.exports = request;
