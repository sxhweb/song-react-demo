/**
 * @author [songxianghao]
 * @email [songxianghao@58.com]
 * @create date 2022-09-15 10:06:21
 * @modify date 2022-09-15 10:06:21
 * @desc [webpack打包静态资源，生成dll文件]
 */

const webpack = require('webpack')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// happypack常见多进程打包
const HappyPack = require('happypack')
// let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const entry = [
  'react',
  'react-dom',
  'react-router',
  'react-router-dom',
  'antd-mobile-icons',
  'antd-mobile'
]
const mode = process.env.NODE_ENV
const isPro = process.env.NODE_ENV === 'production'
const dllPathName = isPro ? 'pro-dll' : 'dev-dll'

module.exports = {
  mode,
  entry: {
    dll: entry
  },
  output: {
    path: path.join(__dirname, `${dllPathName}`),
    filename: isPro ? '[name].[hash:8].js' : '[name].js',
    library: '[name]_[hash]',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'happypack/loader?id=happy'
      },
      {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'}
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 打包生成图片的名字
              name: '[name].[hash:8].[ext]',
              limit: 8129, //小于limit限制的图片将转为base64嵌入引用位置
              fallback: 'file-loader' //大于limit限制的将转交给指定的loader处理
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    // new BundleAnalyzerPlugin(),
    new webpack.DllPlugin({
      path: path.join(__dirname, `${dllPathName}`, 'manifest.json'),
      name: '[name]_[hash]',
      context: __dirname
    }),
    // happypack实例
    new HappyPack({
      id: 'happy',
      loaders: ['babel-loader']
    })
    // new AssetsPlugin({
    //   filename: 'bundle-config.json',
    //   path: `./${dllPathName}`
    // })
  ]
}
