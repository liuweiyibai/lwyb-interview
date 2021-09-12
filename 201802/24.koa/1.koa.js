let Koa = require('koa');
// Koa是一个类 类上有两个方法 一个叫use 一个叫listen
let app = new Koa();
app.listen(3000);

// ctx代表的是上下文 是koa自己创建的
// ctx.request 这是koa自己封装的request属性
// ctx.response 
// ctx.req 原生的req对象
// ctx.res
// ctx有代理的作用 ctx.url
app.use((ctx,next)=>{
    console.log(ctx.url,ctx.request.url,ctx.req.url);
    console.log(ctx.method,ctx.request.method);
    console.log(ctx.request.query); // query
    console.log(ctx.request.path); // pathname
    console.log(ctx.querystring); // a=1&&b=2
    ctx.body = 'hello1';
    ctx.body = 'hello2';
    // 只是以最后一次为准
    ctx.body = 'hello3';
});

// ctx是怎么诞生的 ctx只是用来实现代理req和request的 