let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: {
        x:'./src/x.js',
        y:'./src/y.js'
    },
    mode: 'development',
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test:/jquery/,
                use:[{
                    loader:'expose-loader',
                    options:'$'
                }]
            },
            {
                test: /\.jsx?/,
                use: 'babel-loader',
                exclude:/node_modules/,
                include:/src/
            },
        ]
    },
    plugins: [
        // 提供全局变量插件
        new webpack.ProvidePlugin({
            $:'jquery'
        }),
        new ExtractTextWebpackPlugin({
            filename: 'css/index.css',
        }),
        new HtmlWebpackPlugin({
            filename:'x.html',
            template: 'src/index.html',
            chunks:['x']
        }),
        new HtmlWebpackPlugin({
            filename:'y.html',
            template: 'src/index.html',
            chunks:['y']
        }),
    ],
    devServer: {
        contentBase: './dist',
        port: 4000,
    }
}