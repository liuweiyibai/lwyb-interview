let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
let isDev = process.env.NODE_ENV === 'development';


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
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader'
                    }]
                })
            }
        ]
    },
    plugins: [
        // 使用这个插件注入一个全局的名字
        new webpack.DefinePlugin({
            __DEV__: isDev
        }),
        new ExtractTextWebpackPlugin({
            filename: 'css/index.css',
            disable: isDev
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './dist',
        port: 3000,
        hot: true // 使用热更新
    }
}