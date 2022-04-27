//工具层
//导入crypto加密模块(核心模块)
const crypto = require("crypto");
//导入nodemailer模块发邮件
const nodemailer = require("nodemailer");
//导入jsonwebtoken模块签名token
const jsonwebtoken = require("jsonwebtoken");
//导入文件系统模块(核心模块)
const fs = require("fs");
//导入uuid模块
const uuid = require("uuid");
const { resolve } = require("path");

//创建
let transporter = nodemailer.createTransport({
  //邮件发送者
  host: config.emailOptions.host,
  //端口
  port: config.emailOptions.port,
  //端口为465，secure为true，其他为false
  secure: config.emailOptions.secure,
  //授权
  auth: {
    //邮箱账号
    user: config.emailOptions.user,
    //授权码
    pass: config.emailOptions.pass,
  },
});
class Utils {
  //加密字符串
  cryptoString(value) {
    let hash = crypto.createHash("md5");
    let string = hash.update(`${value}${config.slatOptions.password}`);
    return string.digest("hex");
  }

  //生成验证码
  createValidCode(n) {
    let chars = [0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f","g",];
    let codes = [];
    for (let i = 0; i < n; i++) {
      let index = Math.floor(Math.random() * chars.length);
      codes.push(chars[index]);
    }
    return codes.join("");
  }

  //发送邮件
  sendEmail(option) {
    return new Promise((resolve, reject) => {
      transporter.sendMail(option, (err, info) => {
        //如果发邮件失败
        if (err) {
          reject(err);
        } else {
          //发邮件成功
          resolve(info);
        }
      });
    });
  }

  //解析token
  verifyToken(token) {
    return new Promise((resolve, reject) => {
      jsonwebtoken.verify(token, config.slatOptions.token, (err, decoded) => {
        //err: 如果是非法的, 抛出err
        //decoded: token合法, decoded.name是生成token的字符串
        if (err) {
          //如果token不合法
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  }

  //上传图片
  uploadImg(imgBase64, type) {
    //imgBase64: 图片base64编码, string
    return new Promise((resolve, reject) => {
      let buffer = Buffer.from(imgBase64, "base64");
      //创建文件名称
      let filename = uuid.v1() + `.${type}`;
      //文件路径
      let fileUrl = path.resolve(__basename, `upload/productImgs/${filename}`);
      //将buffer写入服务器中
      // fs.writeFile(写入文件保存的路径, buffer, err => {})
      fs.writeFile(fileUrl, buffer, (err) => {
        if (err) {
          //上传图片失败
          reject(err);
        } else {
          //上传图片成功，返回文件名称
          resolve(filename);
        }
      });
    });
  }

  //上传头像
  uploadAvatar(imgBase64, type) {
    //imgBase64: 图片base64编码, string
    return new Promise((resolve, reject) => {
      let buffer = Buffer.from(imgBase64, "base64");
      //创建文件名称
      let filename = uuid.v1() + `.${type}`;
      //文件路径
      let fileUrl = path.resolve(__basename, `upload/userImgs/${filename}`);
      //将buffer写入服务器中
      // fs.writeFile(写入文件保存的路径, buffer, err => {})
      fs.writeFile(fileUrl, buffer, (err) => {
        if (err) {
          //上传图片失败
          reject(err);
        } else {
          //上传图片成功，返回文件名称
          resolve(filename);
        }
      });
    });
  }
}
module.exports = new Utils();
