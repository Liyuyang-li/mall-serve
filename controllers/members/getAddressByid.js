//会员 根据addressId查询地址数据
module.exports = (req, res) => {
  let sql = 
  "SELECT * FROM `address` AS `a` INNER JOIN `member_address` AS `ma` ON `ma`.`address_id` = `a`.`address_id` AND `ma`.`user_id` = :userId AND `a`.`address_id` = :addressId AND `a`.`remove` = 0" ;
  let params = {
    userId: req.uid,
    addressId: req.query.addressId
  }
  api
    .queryData(sql, "SELECT", params)
    .then((result) => {
      res.send({ msg: "根据id获取地址数据成功", status: 1280, data: result });
    })
    .catch((err) => {
      res.send({ msg: "根据id获取地址数据失败", status: 1281 });
    });
  };