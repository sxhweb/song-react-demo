/**
 * webpack生产环境配置脚本文件
 */
const {DefinePlugin} = require('webpack')
const { merge } = require('webpack-merge')
const base = require('./webpack.config')
// 将打包后的css资源，分离成单独文件,该plugin只适用于production环境下
// 注意：不要同时使用 style-loader 与 mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// css压缩
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// js压缩
const TerserWebpackPlugin = require('terser-webpack-plugin')
// 可视化webpack打包资源
let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(base, {
  plugins: [
    // 一个chunk会对应一个样式css文件
    new MiniCssExtractPlugin({
      filename: './css/[name].css',
      chunkFilename: './css2/[name].css'
    }),
    // new BundleAnalyzerPlugin(),
    new DefinePlugin({
      Theme: JSON.stringify('#b6b1b1')
    })
  ],
  module: {
    rules:[
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              esModule: true
            }
          },
          // {
          //   loader: 'css-loader',
          //   options: {
          //     // 问题，开启css module后，直接import引入的样式文件会失效
          //     modules: true
          //   }
          // },
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  optimization: {
    // 覆盖webpack默认的优化压缩方案
    minimizer: [
      new TerserWebpackPlugin({}),
      new OptimizeCssAssetsWebpackPlugin({})
    ]
  },
  mode: 'production'
})