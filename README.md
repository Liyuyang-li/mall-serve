# mall-serve

电商系统服务端项目

## 技术栈

- Node.js
- Express
- MySQL
- Sequelize
- JSON Web Token (JWT)
- Nodemailer

## 功能模块

- 用户管理（注册、登录、个人信息）
- 会员管理
- 商品管理
- 订单管理
- 购物车管理
- 收藏管理
- 地址管理
- 公告管理
- 分类管理

## 快速开始

### 环境要求

- Node.js
- MySQL 5.7+

### 安装步骤

1. 克隆项目
```bash
git clone https://github.com/Liyuyang-li/mall-serve.git
cd mall-serve
```

2. 安装依赖
```bash
npm install
```

3. 配置数据库

编辑 `config/config.dev.js` 文件，修改数据库配置：
```javascript
mysqlOptions: {
  database: "your_database_name",
  user: "your_username",
  password: "your_password",
  host: "localhost",
  dialect: "mysql"
}
```

4. 启动项目
```bash
npm start
```

服务器将在 http://127.0.0.1:9001 启动

## 目录结构

```
mall-serve/
├── config/              # 配置文件
│   ├── config.dev.js    # 开发环境配置
│   ├── config.js        # 主配置文件
│   └── config.prod.js   # 生产环境配置
├── controllers/         # 控制器（接口层）
│   ├── manage/          # 管理端接口
│   ├── members/         # 会员接口
│   ├── products/        # 商品接口
│   ├── types/           # 分类接口
│   ├── users/           # 用户接口
│   └── controller.js    # 控制器基类
├── db/                  # 数据库相关
│   ├── model/           # 数据模型
│   └── connect.js       # 数据库连接
├── middleware/          # 中间件
│   └── intercept.js     # 拦截器
├── routes/              # 路由
│   └── routes.js        # 路由配置
├── service/             # 服务层
│   └── api.js           # 数据库操作API
├── upload/              # 文件上传目录
│   ├── productImgs/     # 商品图片
│   └── userImgs/        # 用户头像
├── utils/               # 工具函数
│   └── utils.js         # 通用工具
├── whiteList/           # 白名单配置
│   ├── codeList.js
│   ├── hostList.js
│   ├── memberCode.js
│   └── tokenList.js
├── index.js             # 项目入口文件
├── package.json
└── README.md
```

## 主要依赖

- express: Web 框架
- body-parser: 请求体解析
- sequelize: ORM 框架
- mysql2: MySQL 驱动
- jsonwebtoken: JWT 认证
- nodemailer: 邮件发送
- uuid: UUID 生成
- cross-env: 跨平台环境变量设置
- nodemon: 开发时自动重启

## 环境变量

- NODE_ENV: 运行环境（dev/prod）

## 配置说明

- 服务器端口: 9001 (开发环境)
- 静态资源路径: /static/files
- 验证码有效期: 5分钟
- Token 有效期: 1天

## 开发命令

```bash
# 启动开发服务器
npm start

# 手动指定环境启动
cross-env NODE_ENV=dev nodemon index.js
```

## 数据库模型

项目包含以下数据模型：
- User: 用户
- Member: 会员
- Product: 商品
- ProductSku: 商品SKU
- ProductType: 商品分类
- Order: 订单
- MemberOrder: 会员订单
- Address: 地址
- MemberAddress: 会员地址
- MemberLiked: 会员收藏
- Announcement: 公告
- ValidCode: 验证码
- 等等...

## API 文档

API 路由配置见 `routes/routes.js` 文件

## 生产环境部署（Ubuntu）

### 1. 环境准备

```bash
# 更新系统包
sudo apt update && sudo apt upgrade -y

# 安装 Node.js（LTS 版本）
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs

# 安装 MySQL
sudo apt install -y mysql-server

# 安装 PM2（进程管理工具）
sudo npm install -g pm2
```

### 2. 配置 MySQL

```bash
# 启动 MySQL 并设置开机自启
sudo systemctl start mysql
sudo systemctl enable mysql

# 设置 root 密码并创建数据库
sudo mysql

```

在 MySQL 命令行中执行：

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
FLUSH PRIVILEGES;
CREATE DATABASE mall_db CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
EXIT;
```

### 3. 部署项目

```bash
# 克隆项目
git clone https://github.com/Liyuyang-li/mall-serve.git
cd mall-serve

# 仅安装生产依赖
npm install --production

# 创建上传目录
mkdir -p upload/productImgs upload/userImgs upload/typeImgs
```

### 4. 配置生产环境

编辑 `config/config.prod.js` 文件，填写生产环境的数据库、邮箱等配置（参考 `config/config.dev.js` 的结构）：

```javascript
// 生产环境配置

let serverOptions = {
  host: "http://your_domain.com",
  port: 9001,
  limitBody: "800kb"
};
exports.serverOptions = serverOptions;

exports.mysqlOptions = {
  database: "mall_db",
  user: "root",
  password: "your_password",
  host: "localhost",
  dialect: "mysql",
  underscored: true,
  timezone: "+08:00",
};

exports.slatOptions = {
  password: '_abc',
  token: 'lks_'
};

exports.emailOptions = {
  host: "smtp.126.com",
  port: 465,
  secure: true,
  user: "your_email@126.com",
  pass: "your_auth_code",
};

exports.validCodeOptions = {
  minute: 5
};

exports.tokenOptions = {
  expires: '1d',
  keys: ['zynxzx', 'hfshkj', 'qewxcn']
};

exports.nickNameOptions = ['白云', '青云', '老鹰', '彩虹'];

exports.staticBaseUrl = {
  base: '/static/files',
  url: `${serverOptions.host}:${serverOptions.port}`
};

exports.alipay = {
  appId: 'your_alipay_app_id',
  privateKey: 'your_private_key',
  alipayPublicKey: 'your_alipay_public_key',
};
```

### 5. 使用 PM2 启动

```bash
# 以生产环境启动
NODE_ENV=prod pm2 start index.js --name mall-serve

# 设置开机自启
pm2 startup
pm2 save
```

**常用 PM2 命令：**

```bash
pm2 status            # 查看所有进程状态
pm2 logs mall-serve   # 查看日志
pm2 restart mall-serve # 重启服务
pm2 stop mall-serve   # 停止服务
```

### 6. 配置 Nginx 反向代理（推荐）

```bash
sudo apt install -y nginx

# 创建站点配置
sudo nano /etc/nginx/sites-available/mall-serve
```

写入以下配置：

```nginx
server {
    listen 80;
    server_name your_domain.com;

    location / {
        proxy_pass http://127.0.0.1:9001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # 静态资源直接由 Nginx 处理
    location /static/files {
        alias /path/to/mall-serve/upload;
    }
}
```

```bash
# 启用站点并重启 Nginx
sudo ln -s /etc/nginx/sites-available/mall-serve /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 7. 防火墙配置

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp
sudo ufw enable
```

### 8. 数据库初始化

首次启动项目时 Sequelize 会自动同步表结构（详见 `db/connect.js`），无需手动建表。确保步骤 2 中已创建 `mall_db` 数据库即可。

### 生产环境注意事项

- 修改 `config/config.prod.js` 中的密钥（`slatOptions`、`tokenOptions.keys`），避免使用默认值
- 确保数据库密码等敏感信息不提交到版本控制
- 建议使用 HTTPS 并配置 SSL 证书（可配合 Let's Encrypt 免费证书）
- 定期备份 MySQL 数据库
