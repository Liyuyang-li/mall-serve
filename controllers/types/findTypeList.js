//manage 查找商品类型列表
module.exports = (req, res) => {
  // console.log("req.query==>", req.query);
  // SELECT
  // 	`t`.`type_id`,
  // 	`t`.`name`,
  // 	`t`.`status`,
  // 	`t`.`created_at` AS `createdAt`,
  // 	`t`.`updated_at` AS `updatedAt`
  // FROM
  // 	`type` AS `t`
  // 	INNER JOIN `type-user` AS `tu` ON `tu`.`type_id` = `t`.`type_id`
  // 	AND `tu`.`user_id` = 'u_1612503522465'
  // 	AND `t`.`name` LIKE '%%'
  // 	AND `t`.`status` = 0
  // 	AND `t`.`created_at` >= '2021-02-23 00:00:00'
  // 	AND `t`.`created_at` <= '2021-02-23 23:59:59'
  // ORDER BY
  // 	`t`.`created_at` DESC
  // 	LIMIT 0,2
   
  let params = {
   userId: req.uid,
   offset:0,
   pageSize:0
 };
  let sql =
    "SELECT `t`.`type_id` AS `typeId`, `t`.`name`, `t`.`status`, `t`.`created_at` AS `createdAt`,`t`.`updated_at` AS `updatedAt` FROM `type` AS `t` INNER JOIN `type_user` AS `tu` ON `tu`.`type_id` = `t`.`type_id` AND `tu`.`user_id` = :userId AND `t`.`remove` = 0";
  //判断是否存在类型名称查询
  if (req.query.name) {
    sql += " AND `t`.`name` LIKE '%" + req.query.name + "%'";
  }

  //判断是否存在状态
  if (req.query.status) {
    params.status = Number(req.query.status);
    sql += " AND `t`.`status` = :status";
  }

  //判断是否存在日期
  if (req.query.createdAt) {
    params.start = `${req.query.createdAt} 00:00:00`;
    params.end = `${req.query.createdAt} 23:59:59`;

    sql += " AND `t`.`created_at` >= :start AND `t`.`created_at` <= :end";
  }
  if(req.query.offset && req.query.pageSize){
    params.offset = Number(req.query.offset);
    params.pageSize = Number(req.query.pageSize);
    sql += " ORDER BY `t`.`created_at` DESC LIMIT :offset,:pageSize";
  }
 
  // console.log('params==>',params)
  api
    .queryData(sql, "SELECT", params)
    .then((result) => {
      res.send({ msg: "查询商品类型列表成功", status: 1050, data: result });
    })
    .catch((err) => {
      console.log("err ==> ", err);
      res.send({ msg: "查询商品类型列表失败", status: 1051 });
    });
};
