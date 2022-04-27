//会员 获取订单列表
const { Op } = require("sequelize");
module.exports = (req, res) => {
  // console.log(' req.body.orderIds', req.body.orderIds);
  let type = req.body.type;

  if (type == 1) {
    //生成订单编号
    let orderNum = "ZHP_" + new Date().getTime(); //修改type
    let addressId = req.body.addressId;
    let orderIds = req.body.orderIds.split(",");
    api
      .updateData(
        "order",
        {
          type: req.body.type,
          orderNum,
          addressId,
        },
        {
          orderId: {
            [Op.in]: orderIds,
          },
        }
      )
      .then(() => {
        //查询
        let sql =
          "SELECT `p`.`id`, `p`.`product_id`,`p`.`sales`,`p`.`unit`,`p`.`kucun`, `p`.`name`, `p`.`price`, `p`.`or_price` , `p`.`img`, `p`.`detail_img`, `p`.`desc`, `o`.`created_at` AS `createdAt`, `o`.`updated_at` AS `updatedAt`,`o`.`order_id` AS `orderId`, `o`.`product_id`,`o`.`count`,`ps`.`version`,`ps`.`color`,`ps`.`price` AS`realPrice` FROM `order` AS `o` INNER JOIN `member_order` AS `mo` ON `mo`.`order_id` = `o`.`order_id` INNER JOIN `product` AS `p` ON `p`.`product_id` = `o`.`product_id` INNER JOIN `product_sku` AS `ps` ON `o`.`sku_id` = `ps`.`sku_id` AND	`mo`.`user_id` = :userId AND `p`.`remove` = 0 AND `o`.`remove1` = 0 AND `o`.`type` = :type AND `o`.`order_id` IN ( :orderIds )";
        api
          .queryData(sql, "SELECT", {
            userId: req.uid,
            type: req.body.type,
            orderIds: req.body.orderIds.split(","),
          })
          .then((result) => {
            result.forEach((v) => {
              v.img = `${config.staticBaseUrl.url}${config.staticBaseUrl.base}/productImgs/${v.img}`;
              v.detail_img = `${config.staticBaseUrl.url}${config.staticBaseUrl.base}/productImgs/${v.detail_img}`;
              v.costPrice = Number(v.realPrice) * Number(v.count);
            });
            res.send({ msg: "生成订单成功", status: 1410, data: result });
          })
          .catch((err) => {
            console.log("err ==> ", err);

            res.send({ msg: "生成订单失败", status: 1411 });
          });
      })
      .catch((err) => {
        console.log("err ==> ", err);
        res.send({ msg: "生成订单失败", status: 1411 });
      });
  } else if (type == 2 && req.body.orderIds) {
    let orderIds = req.body.orderIds.split(",");
    //付款
    api
      .updateData(
        "order",
        {
          type: req.body.type,
        },
        {
          orderId: {
            [Op.in]: orderIds,
          },
        }
      )
      .then(() => {
        //查询
        let sql =
          "SELECT `p`.`id`, `p`.`product_id`,`p`.`sales`,`p`.`unit`,`p`.`kucun`, `p`.`name`, `p`.`price`, `p`.`or_price` , `p`.`img`, `p`.`detail_img`, `p`.`desc`, `o`.`created_at` AS `createdAt`, `o`.`updated_at` AS `updatedAt`,`o`.`order_id` AS `orderId`, `o`.`product_id`,`o`.`count`,`o`.`order_num` AS `orderNum`,`ps`.`version`,`ps`.`color`,`ps`.`price` AS`realPrice` FROM `order` AS `o` INNER JOIN `member_order` AS `mo` ON `mo`.`order_id` = `o`.`order_id` INNER JOIN `product` AS `p` ON `p`.`product_id` = `o`.`product_id` INNER JOIN `product_sku` AS `ps` ON `o`.`sku_id` = `ps`.`sku_id` AND	`mo`.`user_id` = :userId AND `p`.`remove` = 0 AND `o`.`remove1` = 0 AND `o`.`type` = :type AND `o`.`order_id` IN ( :orderIds )";
        api
          .queryData(sql, "SELECT", {
            userId: req.uid,
            type: req.body.type,
            orderIds: req.body.orderIds.split(","),
          })
          .then((result) => {
            let totalPrice = 0;
            result.forEach((v) => {
              v.img = `${config.staticBaseUrl.url}${config.staticBaseUrl.base}/productImgs/${v.img}`;
              v.detail_img = `${config.staticBaseUrl.url}${config.staticBaseUrl.base}/productImgs/${v.detail_img}`;
              v.costPrice = Number(v.realPrice) * Number(v.count);
              totalPrice += v.costPrice;
            });

            res.send({
              msg: "付款成功",
              status: 1410,
              data: result,
              totalPrice,
            });
          })
          .catch((err) => {
            console.log("err ==> ", err);

            res.send({ msg: "付款失败", status: 1411 });
          });
      })
      .catch((err) => {
        console.log("err ==> ", err);
        res.send({ msg: "付款失败", status: 1411 });
      });
  } else if (type == 2 && req.body.orderNum) {
    //付款
    api
      .updateData(
        "order",
        {
          type: req.body.type,
        },
        {
          orderNum: req.body.orderNum,
        }
      )
      .then(() => {
        //查询
        let sql =
          "SELECT `p`.`id`, `p`.`product_id`,`p`.`sales`,`p`.`unit`,`p`.`kucun`, `p`.`name`, `p`.`price`, `p`.`or_price` , `p`.`img`, `p`.`detail_img`, `p`.`desc`, `o`.`created_at` AS `createdAt`, `o`.`updated_at` AS `updatedAt`,`o`.`order_id` AS `orderId`, `o`.`product_id`,`o`.`count`,`o`.`order_num` AS `orderNum`,`ps`.`version`,`ps`.`color`,`ps`.`price` AS`realPrice` FROM `order` AS `o` INNER JOIN `member_order` AS `mo` ON `mo`.`order_id` = `o`.`order_id` INNER JOIN `product` AS `p` ON `p`.`product_id` = `o`.`product_id` INNER JOIN `product_sku` AS `ps` ON `o`.`sku_id` = `ps`.`sku_id` AND	`mo`.`user_id` = :userId AND `p`.`remove` = 0 AND `o`.`remove1` = 0 AND `o`.`type` = :type AND `o`.`order_num` = :orderNum";
        api
          .queryData(sql, "SELECT", {
            userId: req.uid,
            type: req.body.type,
            orderNum: req.body.orderNum,
          })
          .then((result) => {
            let totalPrice = 0;
            result.forEach((v) => {
              v.costPrice = Number(v.realPrice) * Number(v.count);
              totalPrice += v.costPrice;
            });

            res.send({
              msg: "付款成功",
              status: 1410,
              data: result,
              totalPrice,
            });
          })
          .catch((err) => {
            console.log("err ==> ", err);

            res.send({ msg: "付款失败", status: 1411 });
          });
      })
      .catch((err) => {
        console.log("err ==> ", err);
        res.send({ msg: "付款失败", status: 1411 });
      });
  } else if (type == 4) {
    api
      .updateData(
        "order",
        {
          type: req.body.type,
        },
        {
          orderNum: req.body.orderNum,
        }
      )
      .then(() => {
        res.send({ msg: "收货成功", status: 1410});
      })
      .catch((err) => {
        console.log("err ==> ", err);
        res.send({ msg: "收货失败", status: 1411 });
      });
  }
};
