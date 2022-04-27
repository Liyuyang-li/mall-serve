//会员 根据typeId编辑商品类型数据
module.exports = (req, res) => {
  let params = req.body;
  let userId = req.uid;
  api.updateData('memberLiked',{
   remove : 1
  },{
    ...params,
    userId
  }).then(() => {
      res.send({msg: '取消收藏成功', status: 1340});
    }).catch(err => {
      console.log('err ==> ', err);
      res.send({msg: '取消收藏失败', status: 1341});
    })
}