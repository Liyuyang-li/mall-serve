// 商家获取公告列表
module.exports = (req, res) => {
  console.log("req.query==>", req.query);
  let params = {
    userId: 'u_1614163584463',
  };
  let sql =
    "SELECT `a`.`ac_id` AS `acId`, `a`.`text`, `a`.`created_at` AS `createdAt`, `a`.`id` FROM `announcement` AS `a` INNER JOIN `announcement_user` AS `au` ON `au`.`ac_id` = `a`.`ac_id` AND `au`.`user_id` = :userId  AND `a`.`remove` = 0 ";

  sql += " ORDER BY `a`.`created_at`";
  api
    .queryData(sql, "SELECT", params)
    .then((result) => {
      res.send({ msg: "查询公告列表成功", status: 1380, data: result });
    })
    .catch((err) => {
      console.log("err ==> ", err);

      res.send({ msg: "查询公告列表失败", status: 1381 });
    });
};
