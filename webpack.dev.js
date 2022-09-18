'use strict';
/**
 * webpack开发环境配置脚本文件
 */
const path = require('path')

// DefinePlugin webpack内置的plugin，用来定义全局变量
const {DefinePlugin} = require('webpack')
const { merge } = require('webpack-merge')
const base = require('./webpack.config')
let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// ['SIGINT', 'SIGTERM'].forEach(function (sig) {
//   process.on(sig, function () {
//     // devServer.close();
//     // process.exit();
//     console.log(sig)
//   });
// });

process.on('SIGINT', function () {
  // devServer.close();
  // process.exit();
  console.log('SIGINT')
});

module.exports = merge(base, {
  plugins: [
    new DefinePlugin({
      Theme: JSON.stringify('#26c98f')
    }),
    // new BundleAnalyzerPlugin()
  ],
  // 配置hmr热模块更新
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
      publicPath: '/dist'
    },
    compress: true,
    port: 9999,
    hot: true,
    historyApiFallback: true,
    // open: true
  },
  devtool: 'source-map',
  mode: 'development'
})