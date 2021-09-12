require('p');
// 直接引入 是文件，先去找文件
// 多个模块会组成一个包 包的表示方法就是有一个package.json
//如果有这个文件夹 但是没有package.json 就会去 当前目录下查找index.js index.json 

console.log(module.paths); // 第三方模块的查找路径
// 第三方模块不能加./



// exports和module.exports有什么区别

// module里存放着exports对象 exports == module.exports