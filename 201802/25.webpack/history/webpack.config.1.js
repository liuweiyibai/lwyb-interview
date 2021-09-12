let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let webpack = require('webpack');
// index.js是属于 index.html a.js是属于a.html
// 多页面开发 怎么配置多页面
module.exports = {
    entry:{
        index:'./src/index.js',
        a:'./src/a.js'
    }, 
    output:{
        filename:'[name].js',
        path:path.join(__dirname,'dist'),
    }, 
    module:{}, 
    plugins:[
        // 热加载
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./src/index.html', 
            chunks:['index'],
            hash:true,
        }),
        new HtmlWebpackPlugin({
            filename:'a.html',
            chunks:['a'],
            template:'./src/index.html', 
            hash:true,
        }),
        new CleanWebpackPlugin(['dist']),
    ], 
    // 启动一个静态服务器
    // 默认自动刷新, 热更新
    devServer:{
        contentBase:'./dist',
        host:'localhost',
        port:3000,
        open:true,
        hot:true // 还需要配置一个插件
    },
    mode:'development'
}
