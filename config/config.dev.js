//开发环境配置

//服务器基础配置
let serverOptions = {
  //主机
  host: "http://127.0.0.1",
  //端口
  port: 9000,
  //请求体1大小限制
  limitBody:"800kb"
};
exports.serverOptions = serverOptions;
//数据库基础配置
exports.mysqlOptions = {
  database: "my_test",//数据库名称
  user: "root",       //用户名称
  password: "root",   //连接密码
  host: "localhost",
  dialect: "mysql",
  underscored: true,
  timezone: "+08:00",
};

//加盐配置
exports.slatOptions = {
    //密码
    password:'_abc',
    //token
    token:'lks_'
};

//发邮件配置
exports.emailOptions = {
  //邮件发送者
  host: "smtp.126.com",
  //端口
  port: 465,
  //端口为465，secure为true，其他为false
  secure: true,
  //邮箱账号
  user: "liyuyang_yang@126.com",
  //授权码
  pass: "OBYABLURTTKYKXGP",
};

//验证码有效时间
exports.validCodeOptions = {
  //单位分钟
  minute:5
}

//token配置
exports.tokenOptions = {
  //token有效时间
  expires:'1d',
  //keys
  keys :['zynxzx','hfshkj','qewxcn']
}

//昵称配置
exports.nickNameOptions = [
  '白云',
  '青云',
  '老鹰',
  '彩虹'
]

//配置访问静态目录的伪路径
exports.staticBaseUrl = {
  base: '/static/files',
  url: `${serverOptions.host}:${serverOptions.port}`
}
