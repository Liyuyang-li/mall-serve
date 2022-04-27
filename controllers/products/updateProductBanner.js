//manage 修改商品是否轮播
module.exports = (req, res) => {
  console.log("req.body==>", req.body);
  //把商品类型数据存在数据库,使用事务处理
  api
    .updateData(
      "product",
      {
        isbanner: req.body.isbanner,
        isquickselect: req.body.isquickselect,
        isrecommend: req.body.isrecommend,
      },
      {
        productId: req.body.productId,
      }
    )
    .then((result) => {
      res.send({
        msg: "商品轮播成功",
        status: 1170,
        data: {
          result,
          isbanner: req.body.isbanner,
          isquickselect: req.body.isquickselect,
          isrecommend: req.body.isrecommend,
        },
      });
    })
    .catch((err) => {
      res.send({ msg: "商品轮播失败", status: 1171 });
    });
};
