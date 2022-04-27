//manage 用户获取商品信息列表
module.exports = (req, res) => {
  // console.log("req.query==>", req.query);
  let params = {
   userId: 'u_1614163584463',
  //  offset:Number(req.query.offset),
  //  pageSize:Number(req.query.pageSize)
 };
  let sql =
    "SELECT `p`.`id`, `p`.`product_id`, `p`.`name`, `p`.`sales`,`p`.`unit`, `p`.`isbanner`, `p`.`isquickselect`, `p`.`isrecommend`, `p`.`price`, `p`.`or_price` , `p`.`img`, `p`.`detail_img`, `p`.`desc`, `p`.`created_at` AS `createdAt`, `p`.`updated_at` AS `updatedAt`, `t`.`name` AS `typeName` FROM `product` AS `p` INNER JOIN `product_type` AS `pt` ON `pt`.`product_id` = `p`.`product_id` INNER JOIN `type` AS `t` ON `t`.`type_id` = `pt`.`type_id` INNER JOIN `product_user` AS `pu` ON `pu`.`product_id` = `p`.`product_id` AND `pu`.`user_id` = :userId AND `p`.`remove` = 0 AND `t`.`remove` = 0 AND `p`.`status` = 0";
  
  console.log('params==>',params)
  //判断是否存在类型名称查询
  if (req.query.name) {
    sql += " AND `p`.`name` LIKE '%" + req.query.name + "%'";
  }
  //判断是否存在状态
  if (req.query.isquickselect) {
    params.status = Number(req.query.isquickselect);
    sql += " AND `p`.`isquickselect` = :isquickselect";
  }
  if (req.query.isrecommend) {
    params.status = Number(req.query.isrecommend);
    sql += " AND `p`.`isrecommend` = :isrecommend";
  }
  sql += " ORDER BY `p`.`created_at` DESC";
  api
    .queryData(sql, "SELECT", params)
    .then((result) => {
      result.forEach(v=>{
        v.img = `${config.staticBaseUrl.url}${config.staticBaseUrl.base}/productImgs/${v.img}`;
        v.detail_img = `${config.staticBaseUrl.url}${config.staticBaseUrl.base}/productImgs/${v.detail_img}`;
      })
      res.send({ msg: "查询商品列表成功", status: 1150, data: result });
    })
    .catch((err) => {
      console.log("err ==> ", err);
      res.send({ msg: "查询商品列表失败", status: 1151 });
    });
};
