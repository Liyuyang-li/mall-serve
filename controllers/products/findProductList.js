//manage 查找商品信息列表
module.exports = (req, res) => {
  // console.log("req.query==>", req.query);
  //   SELECT
  // 	`p`.`product_id` AS productId,
  // 	`p`.`name`,
  // 	`p`.`status`,
  // 	`p`.`price`,
  // 	`p`.`img`,
  // 	`p`.`created_at` AS `createdAt`,
  // 	`p`.`updated_at` AS `updatedAt`,
  // 	`t`.`name` AS `typeName`
  // FROM
  // 	`product` AS `p`
  // INNER JOIN `product_type` AS `pt`
  // ON `pt`.`product_id` = `pt`.`product_id`
  // INNER JOIN `type` AS `t`
  // ON `t`.`type_id` = `pt`.`type_id`
  // INNER JOIN `product_user` AS `pu` 
  // ON `pu`.`product_id` = `p`.`product_id` 
  // AND `pu`.`user_id` = 'u_1614163584463' 
  // AND `p`.`remove` = 0
  // AND `t`.`remove` = 0
  // 	AND `p`.`name` LIKE '%原%' 
  // 	AND `p`.`status` = 0 
  // 	AND `p`.`created_at` >= '2021-02-23 00:00:00' 
  // 	AND `p`.`created_at` <= '2021-02-23 23:59:59' 
  // ORDER BY
  // 	`p`.`created_at` DESC
  let params = {
    userId: req.uid,
  };
  let sql =
    "SELECT `p`.`product_id` AS productId, `p`.`isbanner`, `p`.`isquickselect`, `p`.`isrecommend`, `p`.`name`, `p`.`status`, `p`.`price`, `p`.`img`, `p`.`created_at` AS `createdAt`, `p`.`updated_at` AS `updatedAt`, `t`.`name` AS `typeName` FROM `product` AS `p` INNER JOIN `product_type` AS `pt` ON `pt`.`product_id` = `p`.`product_id` INNER JOIN `type` AS `t` ON `t`.`type_id` = `pt`.`type_id` INNER JOIN `product_user` AS `pu` ON `pu`.`product_id` = `p`.`product_id` AND `pu`.`user_id` = :userId AND `p`.`remove` = 0 AND `t`.`remove` = 0"
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
  if (req.query.offset && req.query.pageSize) {
    params.offset = Number(req.query.offset);
    params.pageSize = Number(req.query.pageSize);
    sql += " ORDER BY `t`.`created_at` DESC LIMIT :offset,:pageSize";
  }
  // sql += " ORDER BY `p`.`created_at` DESC LIMIT :offset,:pageSize";
  // console.log('params==>',params)
  api
    .queryData(sql, "SELECT", params)
    .then((result) => {
      result.forEach(v => {
        v.img = `${config.staticBaseUrl.url}${config.staticBaseUrl.base}/productImgs/${v.img}`;
      })
      res.send({ msg: "查询商品列表成功", status: 1150, data: result });
    })
    .catch((err) => {
      console.log("err ==> ", err);
      res.send({ msg: "查询商品列表失败", status: 1151 });
    });
};
