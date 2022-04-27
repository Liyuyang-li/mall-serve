//manage 根据typeId编辑商品类型数据
module.exports = (req, res) => {
  console.log('req.body==>',req.body);
  //01-没有图片, 没有类型, 只有商品基础数据, 只修改Product模型数据
  //02-没有图片, 没有商品基础数据, 只有商品类型, 只修改ProductType模型数据
  //03-没有商品基础数据, 没有类型, 只有图片, 先上传图片, 在将上传的图片名称写入Product模型
  
  // return;
  //更新商品数据
  function updateData() {
    //启动事务处理
    api.transactionData(async t => {
      //t: 事务处理对象
      //判断是否存在用户基本信息
      if (JSON.stringify(req.body) != '{}') {
        //修改商品基础数据
        await api.updateData('member', req.body, {
          userId:req.uid
        })
      }
    }).then(() => {
      res.send({msg: '修改信息成功', status: 1250});
    }).catch(err => {
      console.log('err ==> ', err);
      res.send({msg: '修改信息失败', status: 1251});
    })
  }

  //获取图片信息
  let imgs = [];
  if (req.body.img && req.body.img != '') {
    //处理图片上传
    imgs.push(
      utils.uploadAvatar(req.body.img, req.body.imgType)
    );
  }
  
  //判断是否存在图片
  let keys = Object.keys(imgs);
  if (keys.length == 0) {
    //没有图片
    console.log('没有头像图片');
    updateData();
  } else {
    //存在图片
    //先上传图片, 待上传完毕图片后, 判断是否用户基础数据
    console.log('存在头像图片');
    Promise.all(imgs).then(result => {
      delete req.body.img;
      delete req.body.imgType;
      req.body.avatar = result.join();
      console.log('req.body==>',req.body);
      updateData();
    })

  }
}