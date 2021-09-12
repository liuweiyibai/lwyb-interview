// 默认情况下就叫webpack.config.js
// webpack是基于node的 用的语法commonjs规范
let path = require('path');
// 多个入口 是没有关系的但是要打包到一起去 可以写一个数组，实现多个文件打包成一个文件
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    entry:['./src/index.js','./src/a.js'], // 入口文件
    output:{
        filename:'bundle.[hash:8].js',
        // 必须是绝对路径
        path:path.join(__dirname,'dist'),
    }, // 对象
    module:{}, // 对模块的处理 loader加载器
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html', // 用哪个html作为模板
            hash:true,
            minify:{
               // collapseWhitespace:true,
               // removeAttributeQuotes:true
            }
        }),
        new CleanWebpackPlugin(['dist']),
    ], // webpack对应的插件
    devServer:{},// 开发服务器的配置
    mode:'development' // 模式的配置
}

// 实现html打包功能 可以通过一个模板实现打包出引用好路径的html
