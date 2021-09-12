
let path = require('path');
let fs = require('fs');
let vm = require('vm');
function Module(filename){ // 构造函数
    this.filename = filename;
    this.exports = {};
    this.loaded = true;
}
Module._extentions = ['.js','.json','.node']; // 如果没有后缀 希望添加上查找
Module._cache = {};
Module._resolvePathname = function(filename){
    let p = path.resolve(__dirname,filename);
    if(!path.extname(p)){
        for(var i = 0;i<Module._extentions.length;i++){
            let newPath = p + Module._extentions[i];
            try{ // 如果访问的文件不存在 就会发生异常
                fs.accessSync(newPath);
                return newPath
            }catch(e){}
        }
    }
    return p; //解析出来的就是一个绝对路径
}
Module.wrapper = [
    "(function(exports,require,module,__dirname,__filename){","\n})"
]
/*
    (function(exports,require,module,__dirname,__filename){
        this = module.exports;
        console.log('加载');
        module.exports = 'zfpx'; 
    })

*/
Module.wrap = function(script){
    return Module.wrapper[0]+script+Module.wrapper[1];
}
Module._extentions["js"] = function(module){ // {filename,exports={}}
    let script = fs.readFileSync(module.filename);
    let fnStr = Module.wrap(script);
    vm.runInThisContext(fnStr).call(module.exports,module.exports,req,module)
    // module.exports = zfpx
}
Module._extentions["json"] = function(module){
    let script = fs.readFileSync(module.filename);
    // 如果是json直接拿到内容  json.parse即可
    module.exports = JSON.parse(script); 
}
Module.prototype.load = function(filename){ //{filename:'c://xxxx',exports:'zfpx'}
    // 模块可能是json 也有可能是js
    let ext = path.extname(filename).slice(1); // .js   .json
    Module._extentions[ext](this);
}

function req(filename){ // filename是文件名 文件名可能没有后缀
    // 我们需要弄出一个绝对路径来，缓存是根据绝对路径来的
    filename = Module._resolvePathname(filename); 
    //console.log(filename);
    // 先看这个路径在缓存中有没有，如果有直接返回
    let cacheModule = Module._cache[filename];
    if(cacheModule){ // 缓存里有 直接把缓存中的exports属性进行返回
        return cacheModule.exports
    }
    // 没缓存 加载模块
    let module = new Module(filename);  // 创建模块 {filename:'绝对路径',exports:{}}
    module.load(filename); // 加载这个模块     {filename:'xxx',exports = 'zfpx'}
    Module._cache[filename] = module;
    module.loaded = true; // 表示当前模块是否加载完 
    return module.exports;
}
let result = require('./school');
result = req('./school');
console.log(result);

