//会员 注册
module.exports = (req, res) => {
  //截取参数
  let params = req.body;
  console.log("params==>", params);
  // return;
  // api.findData('user',{}).then(result=>{
  //   console.log('result==>',result);
  // })
  //查询邮箱是否被注册
  api.findData("member", { email: params.email }).then((result) => {
    if (result.length == 0) {
      //查询验证码
      api
        .findData("validCodeMember", { validCode: params.validCode })
        .then((result) => {
          // console.log("result==>", result);
          if (result.length == 0) {
            res.send({ msg: "验证码不正确", status: 1211 });
          } else {
            let userId = "u_" + new Date().getTime();
            //对密码进行加密
            let password = utils.cryptoString(params.password);
            //将数据写入到mysql的user表
            api
              .createData("member", {
                userId: userId,
                email: params.email,
                password: password,
                nickName: params.nickName,
              })
              .then((result1) => {
                console.log(result1)
                if(result1){
                  api
                  .createData("memberUser", {
                    userId: "u_1614163584463",
                    muserId: userId,
                  })
                  .then(() => {
                    res.send({ msg: "注册成功", data: result1, status: 1210 });
                  });
                }
              })
              .catch((err) => {
                res.send({ msg: "注册失败", status: 1211 });
              });
          }
        });
    } else {
      res.send({ msg: "该邮箱已经注册了", status: 1211 });
    }
  });
};
