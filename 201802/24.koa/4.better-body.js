import { RSA_NO_PADDING } from 'constants';

let Koa = require('koa');
let app = new Koa();
let path = require('path');
Buffer.prototype.split = function(sep){
    let pos = 0;
    let len = Buffer.from(sep).length;
    let index = -1;
    let arr = [];
    while(-1!=(index = this.indexOf(sep,pos))){
        arr.push(this.slice(pos,index));
        pos = index+len;
    }
    arr.push(this.slice(pos));
    return arr;
}
function bodyParser(options = {}) {
    let { uploadDir } = options;
    return async (ctx, next) => {
        await new Promise((resolve, reject) => {
            let buffers = [];
            ctx.req.on('data', function (data) {
                buffers.push(data);
            });
            ctx.req.on('end', function () {
                let type = ctx.get('content-type');
                let buff = Buffer.concat(buffers);
                let fields = {}
                if(type.includes('multipart/form-data')){
                    // 多form-data格式
                    let sep = '--'+type.split('=')[1];
                    let lines = buff.split(sep).slice(1,-1);
                    lines.forEach(line=>{
                        let [head,content] = line.split('\r\n\r\n');
                        head = head.slice(2).toString();
                        content = content.slice(0,-2);
                        let [,name] = head.match(/name="(.*)"/);
                        if(head.includes('filename')){
                            // 处理文件
                            // 应该取除了head的部分
                            let c = line.slice(head.length+6);
                            let p = path.join(uploadDir,Math.random().toString());
                            require('fs').writeFileSync(p,c)
                            fields[name] = [{path:p}]
                            // 表单格式
                        }else if(type == 'application/x-www-form-urlencoded'){
                            fields = content.toString(buff.toString());
                            // json格式
                        }else if(type == 'application/json'){
                            fields = JSON.parse(buff.toString())
                        }else{
                            // 普通字符串
                            fields = buff.toString()
                        }
                    })
                }else{
                    // a=b&&c=d 普通的请求
                    fields = require('querystring').parse(buff.toString());
                }
                ctx.request.fields = fields
                resolve();
            });
        });
        await next();
    }
}
app.use(bodyParser({
    uploadDir: path.join(__dirname, 'koa')
}));
app.listen(3000);
app.use(async (ctx, next) => {
    if (ctx.path === '/user' && ctx.method === 'GET') {
        ctx.body = (`
            <form method="post" >
                <input type="text" name="username">
                <input type="text" name="password">
                <input type="submit">
            </form>
        `)
    } else {
        return next();
    }
});
app.use(async (ctx, next) => {
    if (ctx.path === '/user' && ctx.method === 'POST') {
        ctx.set('Content-Type', 'text/html;charset=utf8');
        ctx.body = ctx.request.fields;
    }
});



