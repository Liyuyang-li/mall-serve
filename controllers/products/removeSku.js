//manage 删除商品规格
module.exports = (req, res) => {
  console.log("skuId==>", req.body.skuId);
  //   res.send({ msg: "删除商品规格成功", status: 1180});
  //   return;
  api
    .updateData(
      'productSku',
      { remove: 1 },
      {
        skuId: req.body.skuId,
      }
    )
    .then(() => {
      res.send({ msg: "删除商品规格成功", status: 1182 });
    })
    .catch((err) => {
      console.log("err=>", err);
      res.send({ msg: "删除商品规格失败", status: 1181 });
    });
};
