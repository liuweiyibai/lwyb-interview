module.exports = 'zfpx'


// require方法 传入了一个路径

// Module有一个_load
// 会解析一个绝对路径

// 模块有缓存，如果缓存有 直接取缓存的

// id 模块的标识 
// 每个模块里还有一个exports对象


(function (exports, require, module, __filename, __dirname) {
module.exports = 'zfpx'
})

//runInThisContext 将这个方法运行，并且在一个没有作用域的环境下执行