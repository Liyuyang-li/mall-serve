//会员 根据typeId查询商品类型数据
module.exports = (req, res) => {

  let sql = "SELECT `p`.`id`, `p`.`product_id`,`p`.`sales`,`p`.`unit`,`p`.`kucun`, `p`.`name`, `p`.`price`, `p`.`or_price` , `p`.`img`, `p`.`detail_img`, `p`.`desc`, `p`.`created_at` AS `createdAt`, `p`.`updated_at` AS `updatedAt`, `t`.`name` AS `typeName` FROM `product` AS `p` INNER JOIN `product_type` AS `pt` ON `p`.`product_id` = `pt`.`product_id` INNER JOIN `type` AS `t` ON `t`.`type_id` = `pt`.`type_id` INNER JOIN `product_user` AS `pu` ON `pu`.`product_id` = `p`.`product_id` AND `p`.`remove` = 0 AND `t`.`remove` = 0 AND `pu`.`user_id` = :userId AND `p`.`product_id` = :productId";
    api.queryData(sql,'SELECT', {
        userId:'u_1614163584463',
        productId: req.query.productId,
      }).then(result => {
        result[0].img = `${config.staticBaseUrl.url}${config.staticBaseUrl.base}/productImgs/${result[0].img}`;
        result[0].detail_img = `${config.staticBaseUrl.url}${config.staticBaseUrl.base}/productImgs/${result[0].detail_img}`;
        res.send({msg: '查询商品数据成功', status: 1190, data: result});
      }).catch(err => {
        console.log('err ==> ', err);
       
        res.send({msg: '查询商品数据失败', status: 1191});

      })
}