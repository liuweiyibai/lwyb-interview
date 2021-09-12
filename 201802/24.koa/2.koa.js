let Koa = require('koa');
let app = new Koa();

app.listen(3000);
// 中间件 把中间件套在一起了
function log(){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log('1ok');
            resolve();
        },3000)
    })
}
app.use(async (ctx,next)=>{
    console.log(1);
    return next();
    console.log(2);
});
// 在第一个中间件中调用了next 走到了第二个中间件
// 第二个中间件有等待效果，第二个处于等待状态 那就等着，但是第一个会接着走
// 只要调用next就加上await 放置下一个中间件有异步操作
// 在koa 如果不需要继续可以直接return next
app.use(async (ctx,next)=>{
    console.log(3);
    await log();
    await next();
    console.log(4);
})
app.use(async (ctx,next)=>{
    console.log(5);
    await next();
    console.log(6);
})




// let fn1 = (ctx,next)=>{
//     console.log(1);
//     next();
//     console.log(2);
// }
// let fn2 = (ctx,next)=>{
//     console.log(3);
//     next();
//     console.log(4);
// }
// let fn3 = (ctx,next)=>{
//     console.log(5);
//     next();
//     console.log(6);
// }
// let fns = [fn1,fn2,fn3]; 
// function dispatch(index){
//     let middle = fns[index];
//     if(fns.length === index) return function(){}
//     middle({},()=>dispatch(index+1));
// }
// dispatch(0);