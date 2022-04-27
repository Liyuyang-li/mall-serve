//修改密码
module.exports = (req, res) => {
  api
    .findData(
      "member",
      {
        userId: req.uid,
      },
      ["password"]
    )
    .then((result) => {
        //判断旧密码是否正确
        let password = utils.cryptoString(req.body.password);
        let data = result[0].dataValues;
        //密码正确
        if (data.password === password) {
          console.log('mimazq');
          api.updateData('member',{
            password: utils.cryptoString(req.body.newPassword)
          },{
            userId: req.uid,
          }).then(result1 =>{
            res.send({ msg: "修改密码成功", status: 1310});
          })
        }else{
          res.send({ msg: "密码错误", status: 1311 }); 
        }
      
    })
    .catch((err) => {
      res.send({ msg: "修改密码失败", status: 1311 });
    });
};
