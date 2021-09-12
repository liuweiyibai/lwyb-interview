let http = require('http');
let context = require('./context');
let request = require('./request');
let response = require('./response');
let Stream = require('stream');
let EventEmitter = require('events');
class Koa extends EventEmitter{
    constructor(){
        super();
        this.middlewares = [];
        this.context = context;
        this.request = request;
        this.response = response;
    }
    createContext(req,res){
        // 创建上下文
        let ctx = Object.create(this.context);
        // 创建request
        ctx.request = Object.create(this.request);
        ctx.response = Object.create(this.response);
        ctx.res = ctx.response.res = res;
        ctx.req = ctx.request.req =  req;
        return ctx;
    }
    compose(ctx,middlewares){
        function dispatch(index){
            let middleware = middlewares[index];
            if(middlewares.length === index) return Promise.resolve()
            return Promise.resolve(middleware(ctx,()=>dispatch(index+1)))
        }
        return dispatch(0);
    }
    handleRequest(){
        return (req,res)=>{
            // 创建上下文对象
            res.statusCode = 404;
            let ctx = this.createContext(req,res);
            // 组合后的中间件 而且是一个promise
            let composeMiddleWare = this.compose(ctx,this.middlewares);
            composeMiddleWare.then(()=>{
                let body = ctx.body;
                if(body == undefined){
                    return  res.end('Not Found');
                }
                if(body instanceof Stream){
                    return body.pipe(res);
                }
                if(typeof body === 'object'){
                    return res.end(JSON.stringify(body));
                }
                res.end(ctx.body);
            }).catch(e=>{ // Promise的错误捕获
                this.emit('error',e);
                res.end('Internal Server Error');
            });
            // 当函数执行完后将ctx.body的值进行返回
        }
    }
    listen(){
        let server = http.createServer(this.handleRequest());
        server.listen(...arguments);
    }
    use(fn){
        this.middlewares.push(fn);
    }
}
module.exports = Koa;
// 尝试着 写一个koa-router的中间件
// 写一篇http相关的文章 /  写一个自己的命令行工具