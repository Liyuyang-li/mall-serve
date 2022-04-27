//manage 注册
module.exports = (req, res) => {
  //截取参数
  let params = req.body;
  //查询邮箱是否被注册
  api.findData("user", { email: params.email }).then((result) => {
    if (result.length == 0) {
      //查询验证码
      api
        .findData("validCode", { validCode: params.validateCode })
        .then((result) => {
          console.log("result==>", result);
          if (result.length == 0) {
            res.send({ msg: "验证码不正确", status: 1003 });
          } else {
            let userId = "u_" + new Date().getTime();
            //对密码进行加密
            let password = utils.cryptoString(params.password);
            //将数据写入到mysql的user表
            api
              .createData("user", {
                userId: userId,
                email: params.email,
                password: password,
              })
              .then((result) => {
                res.send({ msg: "注册成功", data: result, status: 1000 });
              })
              .catch((err) => {
                res.send({ msg: "注册失败", status: 1001 });
              });
          }
        });  
    } else {
      res.send({ msg: "该邮箱已经注册了", status: 1002 });
    }
  });
};
