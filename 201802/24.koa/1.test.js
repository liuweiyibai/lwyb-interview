let Koa = require('./koa/application');
let app = new Koa();
app.listen(3000);
app.use(async (ctx,next)=>{
    throw Error('123123123');
});

app.on('error',function(err){
    console.log('e',err)
})
