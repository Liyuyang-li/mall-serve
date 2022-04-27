// 商家获取用户列表
module.exports = (req, res) => {
  console.log("req.query==>", req.query);
  let params = {
    userId: req.uid,
    offset: Number(req.query.offset),
    pageSize: Number(req.query.pageSize),
  };
  let sql =
    "SELECT `m`.`nick_name` AS `nickName`, `m`.`avatar`, `m`.`email`, `m`.`gender`,`m`.`status`, `m`.`phone`, `m`.`user_id` AS `userId`, `m`.`created_at` AS `createdAt`, `m`.`updated_at` AS `updatedAt` FROM `member` AS `m` INNER JOIN `member_user` AS `mu` ON `mu`.`muser_id` = `m`.`user_id` AND `mu`.`user_id` = :userId  AND `m`.`remove` = 0 ";
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
  sql += " ORDER BY `m`.`created_at` DESC LIMIT :offset,:pageSize";
  api
    .queryData(sql, "SELECT", params)
    .then((result) => {
      if (result.length > 0) {
        result.forEach((v) => {
          v.avatar = `${config.staticBaseUrl.url}${config.staticBaseUrl.base}/userImgs/${v.avatar}`;
          let sql1 =
            "SELECT `a`.`name` AS `personName`, `a`.`phone`, `a`.`province`, `a`.`city`, `a`.`county`, `a`.`address_detail`, `a`.`postal_code` FROM `address` AS `a` INNER JOIN `member_address` AS `ma` ON `ma`.`address_id` = `a`.`address_id` AND `ma`.`user_id` = :memberId  AND `a`.`remove` = 0 ";
          api
            .queryData(sql1, "SELECT", {
              memberId: v.userId,
            })
            .then((res) => {
              v.addresses = res;
            });
        });
        res.send({ msg: "查询用户列表成功", status: 1380, data: result });
      } else {
        res.send({ msg: "查询用户列表成功", status: 1380, data: result });
      }
    })
    .catch((err) => {
      console.log("err ==> ", err);

      res.send({ msg: "查询用户列表失败", status: 1381 });
    });
};
