//会员 获取收藏列表
module.exports = (req, res) => {
  let userId = req.uid;
  api
    .findData("memberLiked", { userId,remove:0},['productId'])
    .then((result) => {
      let arr = [];
      result.forEach(v=>{
         arr.push(v.productId);
      })
      console.log('arr==>',arr);
      // res.send({ msg: "获取收藏商品成功", status: 1350 ,data:result});
      // return;
      api.findDataByids('product',arr).then(res1=>{
        res1.forEach(v=>{
          v.img = `${config.staticBaseUrl.url}${config.staticBaseUrl.base}/productImgs/${v.img}`;
          v.detail_img = `${config.staticBaseUrl.url}${config.staticBaseUrl.base}/productImgs/${v.detail_img}`;
        })
        res.send({ msg: "获取收藏商品成功", status: 1350 ,data:res1});
      }).catch(err=>{
        console.log("err ==> ", err);
        res.send({ msg: "获取收藏商品失败", status: 1351 });
      })
    })
    .catch((err) => {
      console.log("err ==> ", err);
      res.send({ msg: "获取收藏商品失败", status: 1351 });
    });
};
