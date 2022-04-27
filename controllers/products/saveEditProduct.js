//manage 根据typeId编辑商品类型数据
module.exports = (req, res) => {
    console.log('req.body==>',req.body);
    // return;
  //01-没有图片, 没有类型, 只有商品基础数据, 只修改Product模型数据
  //02-没有图片, 没有商品基础数据, 只有商品类型, 只修改ProductType模型数据
  //03-没有商品基础数据, 没有类型, 只有图片, 先上传图片, 在将上传的图片名称写入Product模型
  
  //更新商品数据
  function updateProduct() {
    //启动事务处理
    api.transactionData(async t => {
      //t: 事务处理对象
      //判断是否存在类型
      if (typeId) {
        //需要修改ProductType模型数据
        delete req.body.typeId;
        await api.updateData('productType', {
          typeId
        }, {
          productId
        })
      } 
      //判断是否存在商品基础数据
      if (JSON.stringify(req.body) != '{}') {
        //修改商品基础数据
        await api.updateData('product', req.body, {
          productId
        })
      }

      //判断是否存在商品sku数据
      if (skus.length != 0) {

          //修改商品sku数据
        await api.updateDatas('productSku', skus, ['skuId','version','color','price','remove']);
      }

    }).then(() => {
      res.send({msg: '编辑商品成功', status: 1200});
    }).catch(err => {
      console.log('err ==> ', err);
      res.send({msg: '编辑商品失败', status: 1201});
    })
  }

  //保存proId
  let productId = req.body.productId;
  delete req.body.productId;
  
  let skus = req.body.skus;
  delete req.body.skus;

  //商品类型typeId
  let typeId = req.body.typeId;

  //获取图片信息
  let imgName = ['img', 'detailImg'];
  let imgs = [];
  let imgFlag = [];
  imgName.forEach(v => {
    if (req.body[v]) {
      //处理图片上传
      imgs.push(
        utils.uploadImg(req.body[v], req.body[v + 'Type'])
      );
      //保存图片的标记, 以便编辑上传的图片的类型(小图，大图)
      imgFlag.push(v);
      delete req.body[v + 'Type'];
    }
  })

  //判断是否存在图片
  let keys = Object.keys(imgs);
  if (keys.length == 0) {
    //没有图片
    console.log('没有商品图片');
    updateProduct();

  } else {
    //存在图片
    //先上传图片, 待上传完毕图片后, 判断是否存在商品类型, 判断是否存在商品基础数据
    console.log('存在商品图片');
    Promise.all(imgs).then(result => {
      imgFlag.forEach((v, i) => {
        req.body[v] = result[i];
      })

      updateProduct();

    })

  }
}