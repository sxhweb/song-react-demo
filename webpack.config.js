// base webpack config
const webpack = require('webpack')
// 引入path模块
const path = require('path')
// 引入html模版插件，大包生成html模版，自动将webpack build的js，css文件注入html文件中
var HtmlWebpackPlugin = require('html-webpack-plugin');
// 打包前自动清除上次打包记录
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// webpack打包进度
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
// 打包美化插件
const chalk = import('chalk')
const isPro = process.env.NODE_ENV === 'production'
// 通过插件将dll文件加载到html文件中
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          },
          /*
            开启多进程打包。
            进程启动大概为600ms，进程通信也有开销。
            只有工作消耗时间比较长，才需要多进程打包
          */
          {
            loader: 'thread-loader',
            options: {
              // 进程数量
              workers: 2
            }
          }
        ]
      },
      {
        test: /\.less$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              // 问题，开启css module后，直接import引入的样式文件会失效
              modules: true
            }
          },
          { loader: 'less-loader' },
        ]
      },
      // 处理组件库中的样式文件
      {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'}
        ]
      },
      // file-loader能够根据配置项复制使用到的资源（不局限于图片）到构建之后的文件夹，并且能够更改对应的链接；
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'file-loader',
        options: {
          name: './img/[name].[ext]'
        }
      },
      // url-loader包含file-loader的功能，同时可以将资源编译成BASE64
      // {
      //   test: /\.(png|svg|jpg|gif)$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 10 * 1024
      //   }
      // },
      // 处理html文件中webpack不识别的资源
      // {
      //   test: /\.html$/,
      //   loader: 'html-loader'
      // }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new CleanWebpackPlugin(),
    new SimpleProgressWebpackPlugin({
      format: 'verbose'
    }),

    // 映射公共文件打包生成的dll文件，减少打包时间
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(isPro ? './pro-dll/manifest.json' : './dev-dll/manifest.json'),
      // scope: 'xyz',
      /**
       * 报错 __WEBPACK_EXTERNAL_MODULE_dll_reference_dll_7d06b0c4406635269481__ is not defined
       * dll打包输出了umd格式，这里不需要指定了
       *  */
      // sourceType: 'umd',
    }),
    // pro环境下必须确认当前的dll文件的hash
    new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, isPro ? './pro-dll/dll.264ae4dc.js' : './dev-dll/dll.js')
    })
  ],
  // 绝对路径别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '#': path.resolve(__dirname, 'src/assets')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
}