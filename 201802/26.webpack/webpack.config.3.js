let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: "./src/index.js",
    mode: 'development',
    output: {
        filename: 'build.js',
        path: path.join(__dirname, 'dist')
    },
    // 更新环境变量
    module: {
        rules: [
            {
                test: /\.jsx?/,
                use: [
                    {
                        loader: 'babel-loader',

                        // options: {
                        //     presets: ['env', 'stage-0', 'react']
                        // }
                    }
                ],
                exclude:/node_modules/,
                include:/src/
            },
            {
                test: /\.(png|gif|jpg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 5,
                        outputPath: 'images/'
                    }
                }]
            },
            {
                test: /\.html/,
                // 处理html中的图片loader
                use: 'html-withimg-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',

                    }]
                })
            }
        ]
    },
    resolve:{
        // 别名
        alias:{
            'bootstrap':path.resolve(__dirname,'node_modules/bootstrap/dist/css/bootstrap.css')
        },
        // 省略后缀名
        extensions:[' ','.js','.json','.css'],
        modules:['node_modules','lib'],
        //mainFields:['b'] // 默认package.json的main是文件的入口 可以更改
    },
    plugins: [
        // 拷贝静态文件插件
        new CopyWebpackPlugin([{
            from:'./src/doc',
            to:'public'
        }]),
        new ExtractTextWebpackPlugin({
            filename: 'css/index.css',
        }),
        // 使用这个插件注入一个全局的名字
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
    ],
    devServer: {
        contentBase: './dist',
        port: 4000,
    }
}