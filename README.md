# 服务端技术栈
  nodejs + mysql + sequelize

# 启动步骤
  下载代码
  git clone https://github.com/Liyuyang-li/mall-serve.git

  安装nodejs + mysql
  百度找步骤

  安装开发环境启动服务器工具 nodemon 
  npm i nodemon --g

  安装项目依赖模块
  npm install

  如果开发中,启动nodejs服务器
  NODE_ENV=dev nodemon index.js

  config->config.dev.js 开发环境服务器配置
  routes->routes.js 路由文件，可根据此文件查找api（暂无接口文档）

# 创建步骤
  安装express搭建web服务器
  npm i express --save

  body-parser处理post请求体
  npm i body-parser --save

  安装sequelize模块操作mysql
  npm i sequelize --save

  安装操作mysql的驱动
  npm i mysql2 --save

  安装nodemailer模块 发邮件
  npm i nodemailer --save

  安装jsonwebtoken, 签名token
  npm i jsonwebtoken --save

  指定node运行环境
  NODE_ENV=环境名称 nodemon index.js

  获取node运行环境
  process.env.NODE_ENV ==> 环境名称


