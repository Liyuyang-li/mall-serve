//会员 根据typeId编辑商品类型数据
module.exports = (req, res) => {
  let addressId = req.body.addressId;
  delete req.body.addressId;
  // console.log('req.body==>',req.body);
  // return;
  api.updateData('address',{
   ...req.body
  },{
    addressId
  }).then(() => {
      res.send({msg: '修改地址成功', status: 1290});
    }).catch(err => {
      console.log('err ==> ', err);
      res.send({msg: '修改地址失败', status: 1291});
    })
}