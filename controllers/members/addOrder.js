//会员 添加订单，包含购物车
module.exports = (req, res) => {
    //截取参数
    let params = req.body;
    let userId = req.uid;
    console.log('params==>',params,userId);
    // return;
    //生成订单id
    let orderId = 'ord_' + new Date().getTime();
   //启动事务处理
   api.transactionData(async t => {

    await api.createData('order', {...params,orderId}, t);

    await api.createData('memberOrder', {orderId, userId}, t);

  }).then(() => {
    res.send({msg: '添加订单成功', status: 1370});
  }).catch(err => {
    console.log('err ==> ', err);
    res.send({msg: '添加订单失败', status: 1371});
  })
      
  };
  