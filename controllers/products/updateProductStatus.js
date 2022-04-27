//manage 修改商品状态
module.exports = (req, res) => {
  // console.log("req.body==>", req.body);
  //把商品类型数据存在数据库,使用事务处理
  api
    .updateData('product',
      { status: req.body.status },
      {
        productId: req.body.productId,
      }
    )
    .then((result) => {
      res.send({ msg: "修改商品状态成功", status: 1170, data: {result,status:req.body.status} });
    })
    .catch((err) => {
      res.send({ msg: "修改商品状态失败", status: 1171 });
    });
};
