//manage 根据userId查询用户数据
module.exports = (req, res) => {
  let sql =
  "SELECT `m`.`nick_name` AS `nickName`, `m`.`avatar`, `m`.`email`, `m`.`gender`,`m`.`status`, `m`.`phone`, `m`.`user_id` AS `userId`, `m`.`created_at` AS `createdAt`, `m`.`updated_at` AS `updatedAt` FROM `member` AS `m` WHERE `m`.`user_id` = :userId  AND `m`.`remove` = 0 ";
  api
    .queryData(sql, "SELECT", {
      userId: req.query.userId,
    })
    .then((result) => {
      // console.log(result)
      result[0].avatar = `${config.staticBaseUrl.url}${config.staticBaseUrl.base}/userImgs/${result[0].avatar}`;
      res.send({ msg: "查询用户数据成功", status: 1190, data: result });
    })
    .catch((err) => {
      console.log("err ==> ", err);

      res.send({ msg: "查询用户数据失败", status: 1191 });
    });
};
