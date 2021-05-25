const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');

const compress = new CompressionWebpackPlugin({
  algorithm: 'gzip',
  threshold: 10240,
  test: /\.(js|css)$/,
  minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
  deleteOriginalAssets: false, // 删除原文件
});

// maxChunks：使用大于或等于 1 的值，来限制 chunk 的最大数量。使用 1 防止添加任何其他额外的 chunk，这是因为entry/main chunk 也会包含在计数之中。
// minChunkSize: 设置 chunk 的最小大小。
// 在合并 chunk 时，webpack 会尝试识别出具有重复模块的 chunk，并优先进行合并。任何模块都不会被合并到 entry   chunk 中，以免影响初始页面加载时间。
const chunkCount = new webpack.optimize.LimitChunkCountPlugin({
  maxChunks: 5,
  minChunkSize: 100
});

module.exports = {
  publicPath: './',
  productionSourceMap: false,

  chainWebpack: config => {
    // 保存文件时，按照eslint规则格式化代码
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .loader('eslint-loader')
      .tap((options) => {
        options.fix = true;
        return options;
      })
      .end();
    config.module
      .rule('images')
        .use('url-loader')
          .loader('url-loader')
          .tap(options => Object.assign(options, { limit: 10240 }))
  },

  devServer: { // 端口号配置
    port: 8089,
  },

  configureWebpack: {
    plugins: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'pre'? [compress, chunkCount] : [compress],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },

  // 全局引入less变量文件
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, 'src/less/common.less')
      ],
    },
  },
}