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
    // optimization:{
    //     splitChunks:{
    //         cacheGroups:{
    //             vendor:{ // 抽离第三插件
    //                 test:/node_modules/,
    //                 chunks:'initial',
    //                 name:'vendor',
    //                 priority:10
    //             },
    //             commons:{
    //                 chunks: 'initial',
    //                 name:'commons',
    //                 minSize:0 // 只要超出0字节就生产新的包
    //             }
    //         }
    //     }
    // },
    
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                use: 'babel-loader',
                exclude:/node_modules/,
                include:/src/
            },
        ]
    },
    plugins: [
        new webpack.DllReferencePlugin({
            manifest:path.join(__dirname,'dist','vendor.manifest.json')
        }),
        new ExtractTextWebpackPlugin({
            filename: 'css/index.css',
        }),
        new HtmlWebpackPlugin({
            filename:'x.html',
            template: 'src/index.html',
            chunks:['vendor','x']
        }),
        new HtmlWebpackPlugin({
            filename:'y.html',
            template: 'src/index.html',
            chunks: ['vendor','y']
        }),
    ],
    devServer: {
        contentBase: './dist',
        port: 4000,
    }
}