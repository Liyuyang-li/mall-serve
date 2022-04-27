// 商家获取购物车列表
module.exports = (req, res) => {
  console.log("req.query==>", req.query);
  let params = {
    userId: req.uid,
    offset:Number(req.query.offset),
    pageSize:Number(req.query.pageSize),
    
  };
    let sql = "SELECT `p`.`product_id`,`p`.`name`,`p`.`img`,`o`.`order_num` AS `orderNum`,`o`.`type` AS `orderType`,`o`.`created_at` AS `createdAt`,`o`.`updated_at` AS `updatedAt`,`o`.`count`,`o`.`remove1` AS `isRemove1`,`o`.`remove2` AS `isRemove2`,`o`.`remove3` AS `isRemove3`,`o`.`remove4` AS `isRemove4`,`mo`.`user_id` AS `userId`,`m`.`nick_name` AS `nickName`,`m`.`avatar`,`ps`.`version`,`ps`.`color`,`ps`.`price` AS `realPrice` ,`a`.`name` AS `personName`,`a`.`phone`,`a`.`province`,`a`.`city`,`a`.`county`,`a`.`address_detail`,`a`.`postal_code` FROM `order` AS `o` INNER JOIN `member_order` AS `mo` ON `mo`.`order_id` = `o`.`order_id` INNER JOIN `member` AS `m` ON `m`.`user_id` = `mo`.`user_id` INNER JOIN `product` AS `p` ON `p`.`product_id` = `o`.`product_id` INNER JOIN `product_sku` AS `ps` ON `o`.`sku_id` = `ps`.`sku_id` INNER JOIN `product_type` AS `pt` ON `pt`.`product_id` = `p`.`product_id` INNER JOIN `type` AS `t` ON `t`.`type_id` = `pt`.`type_id` INNER JOIN `product_user` AS `pu` ON `pu`.`product_id` = `p`.`product_id` INNER JOIN `address` AS `a` ON `a`.`address_id` = `o`.`address_id`	AND `pu`.`user_id` = :userId AND `p`.`remove` = 0 AND `t`.`remove` = 0";
    
    if (req.query.type !== '0') {
      sql += " AND `o`.`type` = " + req.query.type;
    }
    
    //判断是否存在订单编号查询
    if (req.query.orderNum) {
    sql += " AND `o`.`order_num` LIKE '%" + req.query.orderNum + "%'";
  }

  //判断是否存在收货人查询
  if (req.query.personName) {
    sql += " AND `a`.`name` LIKE '%" + req.query.personName + "%'";
  }
  //判断是否存在日期
  if (req.query.createdAt) {
    params.start = `${req.query.createdAt} 00:00:00`;
    params.end = `${req.query.createdAt} 23:59:59`;
    sql += " AND `o`.`created_at` >= :start AND `o`.`created_at` <= :end";
  }
    sql += " ORDER BY `o`.`created_at` DESC LIMIT :offset,:pageSize";
    api.queryData(sql,'SELECT',params).then(result => {
        result.forEach(v=>{
          v.img = `${config.staticBaseUrl.url}${config.staticBaseUrl.base}/productImgs/${v.img}`;
          v.avatar = `${config.staticBaseUrl.url}${config.staticBaseUrl.base}/userImgs/${v.avatar}`;
          v.costPrice = Number(v.realPrice) * Number(v.count);
          
        })
        res.send({msg: '查询订单列表成功', status: 1380, data: result});
      }).catch(err => {
        console.log('err ==> ', err);
        res.send({msg: '查询订单列表失败', status: 1381});
  
      })
  
  
};