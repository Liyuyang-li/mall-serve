// 用户获取地址信息列表
module.exports = (req, res) => {
  // console.log("req.query==>", req.query);
  let sql =
  "SELECT * FROM `address` AS `a` INNER JOIN `member_address` AS `ma` ON `ma`.`address_id` = `a`.`address_id` AND `ma`.`user_id` = :userId AND `a`.`remove` = 0" ;
let params = {
  userId: req.uid
}
api
  .queryData(sql, "SELECT", params)
  .then((result) => {
    res.send({ msg: "获取地址数据成功", status: 1270, data: result });
  })
  .catch((err) => {
    res.send({ msg: "获取地址数据失败", status: 1271 });
  });
};