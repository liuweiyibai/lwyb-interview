let Koa = require('koa');
let app = new Koa();
let path = require('path');
let bodyParser = require('koa-better-body');
app.use(bodyParser({
    uploadDir:path.join(__dirname,'koa')
}));
app.listen(3000);
// 当访问 /user的时候 显示一个可以提交的表单
// 当提交后 提交到 /user上去 并且方法是/post
app.use(async (ctx,next)=>{
    if(ctx.path === '/user'&&ctx.method === 'GET'){
        ctx.body = (`
            <form method="post" enctype="multipart/form-data">
                <input type="text" name="username">
                <input type="text" name="password">
                <input type="file" name="avatar">
                <input type="submit">
            </form>
        `)
    }else{
        return next();
    }
});
app.use(async (ctx,next)=>{
    // 如过这里有异步方法
    if(ctx.path === '/user'&& ctx.method === 'POST'){
        // 接收请求体 将请求体的结果显示在页面上
        ctx.set('Content-Type','text/html;charset=utf8');
        ctx.body = ctx.request.fields;
    }
});
// 可以使用第三方模块来实现，npm install koa-bodyparser 



// let b = 1;
// function test(){
//     return new Promise((resolve,reject)=>{
//         setTimeout(function(){
//             b = 100
//             resolve();
//         },3000)
//     })
// }
// async function a(){
//     await test();
// }
// Promise.resolve(a()).then(function(){
//     console.log(b)
// })