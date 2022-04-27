//manage 根据typeId查询商品类型数据
module.exports = (req, res) => {
  let sql =
    "SELECT `ps`.`sku_id` AS `skuId`,`ps`.`version`, `ps`.`color`, `ps`.`price` FROM `product_sku` AS `ps` WHERE `ps`.`remove` = 0 AND `ps`.`product_id` = :productId ORDER BY`ps`.`created_at` DESC";
  api
    .queryData(sql, "SELECT", {
      productId: req.query.productId,
    })
    .then((result) => {
      // console.log(result)
      res.send({ msg: "查询商品规格成功", status: 1190, data: result });
    })
    .catch((err) => {
      console.log("err ==> ", err);

      res.send({ msg: "查询商品规格失败", status: 1191 });
    });
};
