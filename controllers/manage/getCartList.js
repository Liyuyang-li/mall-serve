// 商家获取购物车列表
module.exports = (req, res) => {
  console.log("req.query==>", req.query);
  let params = {
    userId: req.uid,
    offset:Number(req.query.offset),
    pageSize:Number(req.query.pageSize)
  };
    let sql = "SELECT `p`.`product_id`, `p`.`name`, `p`.`img`, `o`.`created_at` AS `createdAt`, `o`.`count`, `o`.`remove0` AS `isRemove`, `mo`.`user_id` AS `userId`, `m`.`nick_name` AS `nickName`, `ps`.`version`, `ps`.`color`, `ps`.`price` AS `realPrice` FROM `order` AS `o` INNER JOIN `member_order` AS `mo` ON `mo`.`order_id` = `o`.`order_id` INNER JOIN `member` AS `m` ON `m`.`user_id` = `mo`.`user_id` INNER JOIN `product` AS `p` ON `p`.`product_id` = `o`.`product_id` INNER JOIN `product_sku` AS `ps` ON `o`.`sku_id` = `ps`.`sku_id`  INNER JOIN `product_type` AS `pt` ON `pt`.`product_id` = `p`.`product_id` INNER JOIN `type` AS `t` ON `t`.`type_id` = `pt`.`type_id` INNER JOIN `product_user` AS `pu` ON `pu`.`product_id` = `p`.`product_id`  AND `pu`.`user_id` = :userId AND `p`.`remove` = 0  AND `t`.`remove` = 0  AND `o`.`type` = 0";
    //判断是否存在类型名称查询
  if (req.query.name) {
    sql += " AND `p`.`name` LIKE '%" + req.query.name + "%'";
  }

  //判断是否存在日期
  if (req.query.createdAt) {
    params.start = `${req.query.createdAt} 00:00:00`;
    params.end = `${req.query.createdAt} 23:59:59`;

    sql += " AND `o`.`created_at` >= :start AND `o`.`created_at` <= :end";
  }
    sql += " ORDER BY `p`.`created_at` DESC LIMIT :offset,:pageSize";
    api.queryData(sql,'SELECT',params).then(result => {
        result.forEach(v=>{
          v.img = `${config.staticBaseUrl.url}${config.staticBaseUrl.base}/productImgs/${v.img}`;
        })
        res.send({msg: '查询购物车列表成功', status: 1380, data: result});
      }).catch(err => {
        console.log('err ==> ', err);
       
        res.send({msg: '查询购物车列表失败', status: 1381});
  
      })
  
  
};