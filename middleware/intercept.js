//拦截层
let whiteList = require(path.resolve(__basename, "whiteList/hostList.js"));
let codeList = require(path.resolve(__basename, "whiteList/codeList.js"));
let tokenList = require(path.resolve(__basename, "whiteList/tokenList.js"));
let memberCode = require(path.resolve(__basename, "whiteList/memberCode.js"));

module.exports = (app) => {
  //CORS 跨域资源共享
  //app.all(*)表示所有请求路径必须经过
  app.all("*", (req, res, next) => {
    //动态允许域名请求
    res.header("Access-Control-Allow-Origin", req.headers.origin);

    //*表示允许所有域请求，在实际开发中，一般指定允许某个域请求，如上面设置
    // res.header("Access-Control-Allow-Origin", "*");

    //如果浏览器请求包括Access-Control-Request-Headers字段，则Access-Control-Allow-Headers字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在"预检"中请求的字段。
    res.header(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type,token"
    );

    //该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次"预检"请求。
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

    //该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可
    //res.header('Access-Control-Allow-Credentials', true);

    next();
  });

  //跳过嗅探
  app.use((req, res, next) => {
    if (req.method == "OPTIONS") {
      //让options尝试请求快速结束
      res.send(200);
    } else {
      next();
    }
  });

  //请求域拦截层
  app.use((req, res, next) => {
    // console.log("经过中间层1",whiteList,req.headers.origin);
    if (whiteList.includes(req.headers.origin)) {
      next();
    } else {
      next();
      // res.send({ msg: "请求域不合法", status: 0 });
    }
  });

  //验证码请求拦截
  app.use((req, res, next) => {
    let url = req.url.split("?")[0];
    // console.log("验证码请求拦截");
    if (codeList.includes(url)) {
      //需要验证验证码
      //截取codeId
      let codeId = req.body.codeId || req.query.codeId;
      //如果不存在codeId
      if (codeId == "") {
        return res.send({ msg: "验证码错误", status: 1021 });
      }
      //如果存在codeId，则需要根据codeId获取验证码邮箱，有效时间，code
      api
        .findData("validCode", {
          codeId,
        })
        .then((result) => {
          // console.log('result==>',result);
          let data = result[0].dataValues;
          //当前时间-有效时间
          let currentTime =
            Date.now() - config.validCodeOptions.minute * 60 * 1000;
          //验证码创建时间
          let creatTime = new Date(data.createdAt);
          // console.log(currentTime,creatTime);
          if (
            currentTime <= creatTime &&
            data.validCode === req.body.validateCode &&
            data.email === req.body.email
          ) {
            //  res.send({msg:'验证码验证成功',status:1020});
            next();
          } else {
            res.send({ msg: "验证码无效", status: 1022 });
          }
        })
        .catch((err) => {
          console.log("err==>", err);
          res.send({ msg: "验证码错误", status: 1021 });
        });
    } else {
      next();
    }
  });

  //会员注册验证码请求拦截
  app.use((req, res, next) => {
    let url = req.url.split("?")[0];
    // console.log("验证码请求拦截");
    if (memberCode.includes(url)) {
      //需要验证验证码
      //截取codeId
      let codeId = req.body.codeId || req.query.codeId;
      //如果不存在codeId
      if (codeId == "") {
        return res.send({ msg: "验证码错误", status: 1221 });
      }
      //如果存在codeId，则需要根据codeId获取验证码邮箱，有效时间，code
      api
        .findData("validCodeMember", {
          codeId,
        })
        .then((result) => {
          // console.log('result==>',result);
          let data = result[0].dataValues;
          //当前时间-有效时间
          let currentTime =
            Date.now() - config.validCodeOptions.minute * 60 * 1000;
          //验证码创建时间
          let creatTime = new Date(data.createdAt);
          // console.log(currentTime,creatTime);
          if (
            currentTime <= creatTime &&
            data.validCode === req.body.validCode &&
            data.email === req.body.email
          ) {
            //  res.send({msg:'验证码验证成功',status:1020});
            next();
          } else {
            res.send({ msg: "验证码无效", status: 1222 });
          }
        })
        .catch((err) => {
          console.log("err==>", err);
          res.send({ msg: "验证码错误", status: 1221 });
        });
    } else {
      next();
    }
  });

  //token验证
  app.use((req, res, next) => {
    let url = req.url.split("?")[0];
    if (tokenList.includes(url)) {
      console.log('token验证url==>', url);
      let token = null;
      if (req.headers.token) {
        let tokens = req.headers.token.split("; ");
        let tokenOption = {};
        tokens.forEach((v) => {
          let t = v.split("=");
          tokenOption[t[0]] = t[1];
        });
        let tks = [];
        config.tokenOptions.keys.forEach((v) => {
          tks.push(tokenOption[v]);
        });
        //获取token
        token = tks.join(".");
      }
      utils.verifyToken(token).then(result => {
        req.uid = result.data;
        console.log('req.uid==>', req.uid);
        next();
      }).catch(err => {
        res.send({ msg: 'token验证失败，请先登录', status: 1041, data: err });
      })

    } else {
      next();
      console.log("token无需验证");
    }
  });
};
