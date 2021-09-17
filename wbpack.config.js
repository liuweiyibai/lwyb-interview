module.exports = {
  //...optimization: {
  splitChunks: {
    chunks: 'async',
    // 内容超过了minSize的值，才会进行打包
    minSize: 20000,
    // 确保拆分后剩余的最小 chunk 体积超过此项的值，防止出现大小为0的模块
    minRemainingSize: 0,
    minChunks: 1,
    maxAsyncRequests: 30,
    maxInitialRequests: 30,
    // 超过这个值就会进行强制分包处理，无视minRemainingSize,maxAsyncRequests，maxInitialRequests
    enforceSizeThreshold: 50000,
    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
        reuseExistingChunk: true,
      },
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true,
      },
    },
  },
};
