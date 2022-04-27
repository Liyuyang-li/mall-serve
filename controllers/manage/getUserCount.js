//manage 查找用户数量
module.exports = (req, res) => {
  console.log("req.query==>", req.query);
  let params = {
    userId: req.uid,
  };
  let sql =
    "SELECT COUNT(`m`.`user_id`) AS `count` FROM `member` AS `m` INNER JOIN `member_user` AS `mu` ON `mu`.`muser_id` = `m`.`user_id` AND `mu`.`user_id` = :userId  AND `m`.`remove` = 0 ";
  //判断是否存在类型名称查询
  if (req.query.userId) {
    params.memberId = req.query.userId;
    sql += " AND `m`.`user_id`= :memberId";
  }

  if (req.query.status) {
    params.status = req.query.status;
    sql += " AND `m`.`status`= :status";
  }

  //判断是否存在日期
  if (req.query.createdAt) {
    params.start = `${req.query.createdAt} 00:00:00`;
    params.end = `${req.query.createdAt} 23:59:59`;

    sql += " AND `m`.`created_at` >= :start AND `m`.`created_at` <= :end";
  }
  sql += " ORDER BY `m`.`created_at` DESC";
  api
    .queryData(sql, "SELECT", params)
    .then((result) => {
      res.send({ msg: "查询用户列表数量成功", status: 1380, data: result });
    })
    .catch((err) => {
      console.log("err ==> ", err);

      res.send({ msg: "查询用户列表数量失败", status: 1381 });
    });
};
