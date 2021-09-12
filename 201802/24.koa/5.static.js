let Koa = require('koa');
let app = new Koa();
//let static = require('koa-static');
let path = require('path');
let util = require('util');
let fs = require('fs');
let stat = util.promisify(fs.stat);
function static(p){
    return async (ctx,next)=>{
        try{
            p = path.join(p,'.'+ctx.path);
            let stateObj = await stat(p);
            console.log(p);
            if(stateObj.isDirectory()){
                
            }else{
                ctx.body = fs.createReadStream(p);
            }
        }catch(e){
            console.log(e)
            await next();
        }
    }
}
app.use(static(path.join(__dirname,'public')))
app.use(async (ctx,next)=>{
    ctx.body = 'not found'
})
app.listen(8000)