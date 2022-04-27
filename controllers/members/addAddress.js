//会员 注册
module.exports = (req, res) => {
    //截取参数
    let params = req.body;
    let userId = req.uid;
    console.log('params==>',params,userId);
    // return;
    //生成地址id
    let addressId = 'add_' + new Date().getTime();
   //启动事务处理
   api.transactionData(async t => {

    await api.createData('address', {...params,addressId}, t);

    await api.createData('memberAddress', {addressId, userId}, t);

  }).then(() => {
    res.send({msg: '添加地址成功', status: 1260});
  }).catch(err => {
    console.log('err ==> ', err);
    res.send({msg: '添加地址失败', status: 1261});
  })
      
  };
  