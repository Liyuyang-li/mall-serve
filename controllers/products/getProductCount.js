//manage 查找商品数量
module.exports = (req, res) => {
  let params = {
    userId: req.uid,
  };
  let sql =
    "SELECT COUNT(`p`.`product_id`) AS `count` FROM `product` AS `p` INNER JOIN `product_type` AS `pt` ON `pt`.`product_id` = `p`.`product_id` INNER JOIN `type` AS `t` ON `t`.`type_id` = `pt`.`type_id` INNER JOIN `product_user` AS `pu` ON `pu`.`product_id` = `p`.`product_id` AND `pu`.`user_id` = :userId AND `p`.`remove` = 0 AND `t`.`remove` = 0";
  //判断是否存在类型名称查询
  if (req.query.name) {
    sql += " AND `p`.`name` LIKE '%" + req.query.name + "%'";
  }

  //判断是否存在商品类型
  if (req.query.typeId) {
    params.typeId = req.query.typeId;
    sql += " AND `pt`.`type_Id` = :typeId";
  }

  //判断是否存在状态
  if (req.query.status) {
    params.status = Number(req.query.status);
    sql += " AND `p`.`status` = :status";
  }

  //判断是否存在日期
  if (req.query.createdAt) {
    params.start = `${req.query.createdAt} 00:00:00`;
    params.end = `${req.query.createdAt} 23:59:59`;

    sql += " AND `p`.`created_at` >= :start AND `p`.`created_at` <= :end";
  }

  sql += " ORDER BY `p`.`created_at` DESC";
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
