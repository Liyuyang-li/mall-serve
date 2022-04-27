//会员 获取轮播商品
module.exports = (req, res) => {
  api
    .findData("product", {remove:0,isbanner:1})
    .then((result) => {
      result.forEach(v=>{
         v.img = `${config.staticBaseUrl.url}${config.staticBaseUrl.base}/productImgs/${v.img}`;
      v.detailImg = `${config.staticBaseUrl.url}${config.staticBaseUrl.base}/productImgs/${v.detailImg}`;
      })
     
      res.send({ msg: "获取轮播商品成功", status: 1360 ,data:result});
    })
    .catch((err) => {
      console.log("err ==> ", err);
      res.send({ msg: "获取轮播商品失败", status: 1361 });
    });
    
};
