//会员 登录
//引入jsonwebtoken模块
const jsonwebtoken = require("jsonwebtoken");
module.exports = (req, res) => {
  api
    .findData(
      "member",
      {
        email: req.body.email,
      },
      ["userId", "password"]
    )
    .then((result) => {
      if (result.length == 0) {
        res.send({ msg: "该邮箱还没注册", status: 1232 });
      } else {
        //邮箱存在，判断密码是否正确
        let password = utils.cryptoString(req.body.password);
        let data = result[0].dataValues;
        //密码正确
        if (data.password === password) {
          //用userId签名token
          let token = jsonwebtoken.sign(
            {
              data: data.userId,
            },
            //加盐
            config.slatOptions.token,
            //有效时间
            {
              expiresIn: config.tokenOptions.expires,
            }
          );
          let tokens = token.split(".");
          let ts = {
            jhxbzb: "ahsbkKJLlzclssjsdka_cskdfAKJKkllkll",
            lkdldn: "cxknfksnmxzKKss_OPsdcz",
          };
          config.tokenOptions.keys.forEach((v, i) => {
            ts[v] = tokens[i];
          });
          res.send({ msg: "登录成功", status: 1230, data: ts });
        }else{
            res.send({ msg: "邮箱或密码错误", status: 1231 }); 
        }
      }
    })
    .catch((err) => {
      res.send({ msg: "登录错误", status: 1031 });
    });
};
