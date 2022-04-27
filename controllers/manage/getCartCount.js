//manage 查找购物车数量
module.exports = (req, res) => {
  let params = {
    userId: req.uid,
  };
  let sql =
    "SELECT COUNT(`o`.`order_id`) AS `count` FROM `order` AS `o` INNER JOIN `product` AS `p` ON `p`.`product_id` = `o`.`product_id` INNER JOIN `product_type` AS `pt` ON `pt`.`product_id` = `p`.`product_id` INNER JOIN `type` AS `t` ON `t`.`type_id` = `pt`.`type_id` INNER JOIN `product_user` AS `pu` ON `pu`.`product_id` = `p`.`product_id` AND `pu`.`user_id` = :userId AND `p`.`remove` = 0 AND `t`.`remove` = 0";
  //判断是否存在类型名称查询
  if (req.query.name) {
    sql += " AND `p`.`name` LIKE '%" + req.query.name + "%'";
  }

  //判断是否存在日期
  if (req.query.createdAt) {
    params.start = `${req.query.createdAt} 00:00:00`;
    params.end = `${req.query.createdAt} 23:59:59`;

    sql += " AND `o`.`created_at` >= :start AND `o`.`created_at` <= :end";
  }

  sql += " ORDER BY `p`.`created_at` DESC ";
  console.log("params==>", params);
  api
    .queryData(sql, "SELECT", params)
    .then((result) => {
      res.send({ msg: "查询商品数量成功", status: 1160, data: result });
    })
    .catch((err) => {
      console.log("err ==> ", err);
      res.send({ msg: "查询商品数量失败", status: 1161 });
    });
};
