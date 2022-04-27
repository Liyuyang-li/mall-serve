//会员注册 发送验证码
module.exports = (req, res) => {
   //生成验证码
   let code = utils.createValidCode(6);
   let codeId = "c_" + new Date().getTime();
  //  console.log('codeId==>',codeId);
   //把验证码存在数据库
   api.createData('validCodeMember',{
     codeId:codeId,
     email:req.body.email,
     validCode:code
   }).then((result) => {
    res.send({msg: '发送验证码成功', status: 1220, data: result});
    return;
       //发送邮件
      utils.sendEmail({
        //发送者邮箱
        from: config.emailOptions.user,
        //接收者邮箱列表
        to: req.body.email,
        //邮件主题
        subject: "后台管理系统验证码",
        //邮件文本内容
        text: `验证码为：${code}，有效时间五分钟。`,
        //邮件html内容
        // html: "<a>Hello world</a>",
      }).then(() => {
        res.send({msg: '发送验证码成功', status: 1220, data: result});
      }).catch(err => {
        console.log('err ==> ', err);
        res.send({msg: '发送验证码失败', status: 1221});
      })
  }).catch((err) => {
    console.log('验证码添加失败');
  });
};