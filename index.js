const express = require('express');
const bodyParser = require('body-parser');
global.path = require('path');
global.__basename = __dirname;

//导入服务器基础配置
global.config = require(path.resolve(__basename,'config/config.js'));
// console.log('config==>',config);

//导入中间层
global.middleware = require(path.resolve(__basename,'middleware/intercept.js'))

//导入路由层
let routes = require(path.resolve(__basename,'routes/routes.js'));

//实例化express
let app = new express();

//导入数据库连接实例
global.sequelize = require(path.resolve(__basename,'db/connect.js'));

//导入数据库模型
global.model = require(path.resolve(__basename,'db/model/model.js'));

//导入操作数据库API
global.api = require(path.resolve(__basename,'service/api.js'));

//导入工具层utils
global.utils = require(path.resolve(__basename,'utils/utils.js'))

//设置静态目录
app.use(config.staticBaseUrl.base, express.static(path.resolve(__basename, 'upload')));

//会在req对象添加一个body属性, 该属性保存在post请求体的参数
//解析post请求体 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false ,limit: config.serverOptions.limitBody}))
//解析 application/json
app.use(bodyParser.json({limit: config.serverOptions.limitBody}))

//加载中间层和跨域设置
middleware(app);

//加载路由接口
routes(app);


app.listen(config.serverOptions.port,()=>{
    console.log(`the server is running at${config.serverOptions.host}:${config.serverOptions.port}...`)
})