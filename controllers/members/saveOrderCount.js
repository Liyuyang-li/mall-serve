//会员 修改购物车商品数量
module.exports = (req, res) => {
  let orderId = req.body.orderId;
  delete req.body.orderId;
  api.updateData('order',{
   ...req.body
  },{
    orderId
  }).then(() => {
      res.send({msg: '修改数量成功', status: 1390});
    }).catch(err => {
      console.log('err ==> ', err);
      res.send({msg: '修改数量失败', status: 1391});
    })
}