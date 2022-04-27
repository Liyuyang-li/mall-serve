//会员 注册
module.exports = (req, res) => {
    //截取参数
    let params = req.body;
    let userId = req.uid;
    console.log('params==>',params,userId);
   //启动事务处理
   api.transactionData(async t => {

    await api.createData('memberLiked', {...params,userId}, t);

  }).then(() => {
    res.send({msg: '收藏成功', status: 1320});
  }).catch(err => {
    console.log('err ==> ', err);
    res.send({msg: '收藏失败', status: 1321});
  })
      
  };
  