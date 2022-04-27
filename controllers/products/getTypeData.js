//manage 获取商品类型数据
module.exports = (req, res) => {
  let sql =
    "SELECT `t`.`type_id` AS `typeId`, `t`.`name`, `t`.`status`, `t`.`created_at` AS `createdAt`,`t`.`updated_at` AS `updatedAt` FROM `type` AS `t` INNER JOIN `type_user` AS `tu` ON `tu`.`type_id` = `t`.`type_id` AND `tu`.`user_id` = :userId AND `t`.`remove` = 0 AND `t`.`status` = 0" ;
  let params = {
    userId: req.uid
  }
  api
    .queryData(sql, "SELECT", params)
    .then((result) => {
      res.send({ msg: "获取商品类型数据成功", status: 1140, data: result });
    })
    .catch((err) => {
      res.send({ msg: "获取商品类型数据失败", status: 1141 });
    });
};
