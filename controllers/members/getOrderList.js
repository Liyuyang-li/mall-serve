// 用户获取订单列表
module.exports = (req, res) => {
  console.log("req.query==>", req.query);
  let type = req.query.type;
  if(type==0){
    let sql = "SELECT `p`.`id`, `p`.`product_id`,`p`.`sales`,`p`.`unit`,`p`.`kucun`, `p`.`name`, `p`.`price`, `p`.`or_price` , `p`.`img`, `p`.`detail_img`, `p`.`desc`, `p`.`created_at` AS `createdAt`, `p`.`updated_at` AS `updatedAt`,`o`.`order_id` AS `orderId`, `o`.`product_id`,`o`.`count`,`ps`.`version`,`ps`.`color`,`ps`.`price` AS`realPrice` FROM `order` AS `o` INNER JOIN `member_order` AS `mo` ON `mo`.`order_id` = `o`.`order_id` INNER JOIN `product` AS `p` ON `p`.`product_id` = `o`.`product_id` INNER JOIN `product_sku` AS `ps` ON `o`.`sku_id` = `ps`.`sku_id` AND	`mo`.`user_id` = :userId AND `p`.`remove` = 0 AND `o`.`remove0` = 0 AND `o`.`type` = :type";
    api.queryData(sql,'SELECT', {
        userId: req.uid,
        type:req.query.type
      }).then(result => {
        result.forEach(v=>{
          v.img = `${config.staticBaseUrl.url}${config.staticBaseUrl.base}/productImgs/${v.img}`;
          v.detail_img = `${config.staticBaseUrl.url}${config.staticBaseUrl.base}/productImgs/${v.detail_img}`;
        })
        res.send({msg: '查询订单列表成功', status: 1380, data: result});
      }).catch(err => {
        console.log('err ==> ', err);
       
        res.send({msg: '查询订单列表失败', status: 1381});
  
      })
  }else {
    let sql = "SELECT `p`.`id`, `p`.`product_id`,`p`.`sales`,`p`.`unit`,`p`.`kucun`, `p`.`name`, `p`.`price`, `p`.`or_price` , `p`.`img`, `p`.`detail_img`, `p`.`desc`, `o`.`created_at` AS `createdAt`, `o`.`updated_at` AS `updatedAt`,`o`.`order_id` AS `orderId`,`o`.`order_num` AS `orderNum`, `o`.`count`,`ps`.`version`,`ps`.`color`,`ps`.`price` AS`realPrice`,`a`.`name` AS `addressName`,`a`.`phone`,`a`.`province`,`a`.`city`,`a`.`county`,`a`.`address_detail`,`a`.`postal_code` FROM `order` AS `o` INNER JOIN `member_order` AS `mo` ON `mo`.`order_id` = `o`.`order_id` INNER JOIN `product` AS `p` ON `p`.`product_id` = `o`.`product_id` INNER JOIN `product_sku` AS `ps` ON `o`.`sku_id` = `ps`.`sku_id` INNER JOIN `address` AS `a` ON `a`.`address_id` = `o`.`address_id` AND	`mo`.`user_id` = :userId AND `p`.`remove` = 0 AND `o`.`type` = :type";

    //判断是否存在状态
  if (req.query.remove0) {
   
    sql +=  " AND `o`.`remove0` = 0";
  }
  if (req.query.remove1) {
    
    sql +=  " AND `o`.`remove1` = 0";
  }
  if (req.query.remove2) {
   
    sql +=  " AND `o`.`remove2` = 0";
  }
  if (req.query.remove3) {
    
    sql +=  " AND `o`.`remove3` = 0";
  }
  if (req.query.remove4) {

    sql +=  " AND `o`.`remove4` = 0";
  }
  if (req.query.remove5) {
    sql +=  " AND `o`.`remove5` = 0";
  }
  api.queryData(sql,'SELECT', {
      userId: req.uid,
      type:type
    }).then(result => {
      result.forEach(v=>{
        v.img = `${config.staticBaseUrl.url}${config.staticBaseUrl.base}/productImgs/${v.img}`;
        v.detail_img = `${config.staticBaseUrl.url}${config.staticBaseUrl.base}/productImgs/${v.detail_img}`;
        v.costPrice = Number(v.realPrice) * Number(v.count);
      })
      res.send({msg: '查询订单列表成功', status: 1380, data: result});
    }).catch(err => {
      console.log('err ==> ', err);
     
      res.send({msg: '查询订单列表失败', status: 1381});

    })
  }
  
};