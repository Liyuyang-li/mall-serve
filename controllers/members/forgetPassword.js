//会员 忘记密码
module.exports = (req, res) => {
  //截取参数
  let params = req.body;
  console.log("params==>", params);
  //查询邮箱是否被注册
  api.findData("member", { email: params.email }).then((result) => {
    if (result.length > 0) {
      //查询验证码
      api
        .findData("validCodeMember", { validCode: params.validCode })
        .then((result) => {
          if (result.length == 0) {
            res.send({ msg: "验证码不正确", status: 1211 });
          } else {
            api
              .updateData(
                "member",
                {
                  password: utils.cryptoString(req.body.newPassword),
                },
                {
                  email:params.email,
                }
              )
              .then(() => {
                res.send({ msg: "修改密码成功", status: 1310 });
              })
              .catch((wrr) => {
                res.send({ msg: "修改密码失败", status: 1311 });
              });
          }
        }).catch((wrr) => {
            res.send({ msg: "验证码错误", status: 1311 });
          });
    } else {
      res.send({ msg: "该邮箱未注册了", status: 1211 });
    }
  });
};
