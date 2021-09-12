let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
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
    plugins: [
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