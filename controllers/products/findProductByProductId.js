//manage 根据typeId查询商品类型数据
module.exports = (req, res) => {
  let sql =
    "SELECT `p`.`product_id` AS `productId`, `p`.`name`, `p`.`price`, `p`.`or_price` AS `orPrice`, `p`.`unit`, `p`.`kucun`, `p`.`sales`,`p`.`price`, `p`.`img`, `p`.`detail_img` AS `detailImg`, `p`.`status`, `p`.`desc`, `pt`.`type_id` AS `typeId` FROM `product` AS `p` INNER JOIN `product_type` AS `pt` ON `p`.`product_id` = `pt`.`product_id` INNER JOIN `type` AS `t` ON `t`.`type_id` = `pt`.`type_id` INNER JOIN `product_user` AS `pu` ON `pu`.`product_id` = `p`.`product_id` AND `p`.`remove` = 0 AND `t`.`remove` = 0 AND `pu`.`user_id` = :userId AND `p`.`product_id` = :productId";
  api
    .queryData(sql, "SELECT", {
      userId: req.uid,
      productId: req.query.productId,
    })
    .then((result) => {
      // console.log(result)
      result[0].img = `${config.staticBaseUrl.url}${config.staticBaseUrl.base}/productImgs/${result[0].img}`;
      result[0].detailImg = `${config.staticBaseUrl.url}${config.staticBaseUrl.base}/productImgs/${result[0].detailImg}`;
      res.send({ msg: "查询商品数据成功", status: 1190, data: result });
    })
    .catch((err) => {
      console.log("err ==> ", err);

      res.send({ msg: "查询商品数据失败", status: 1191 });
    });
};
