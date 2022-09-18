#!bin/bash
#  声明在shell中执行,以下代码相当于在终端执行命令
#! 是一个约定的标记，它告诉系统这个脚本需要什么解释器来执行，即使用哪一种 Shell。

# 生产环境下打包
npm run pro

# 生产环境下打包测试，并启动live-server
if [ $1 == 'live' ]
then 
  npm run server
else
  echo 'you has build the chuank for production'
fi

