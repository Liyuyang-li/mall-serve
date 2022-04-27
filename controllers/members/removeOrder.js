//manage 删除购物车或订单
const { Op } = require("sequelize");
module.exports = (req, res) => {
  // console.log(typeof req.body.orderIds);
  
  let type = req.body.type;
  if (type == 0) {
    let orderIds = req.body.orderIds.split(",");
    api
      .updateData(
        "order",
        {
          remove0: 1,
        },
        {
          orderId: {
            [Op.in]: orderIds,
          },
        }
      )
      .then(() => {
        res.send({ msg: "删除购物车成功", status: 1400 });
      })
      .catch((err) => {
        console.log("err ==> ", err);
        res.send({ msg: "删除购物车失败", status: 1401 });
      });
  }else{
    let remove = `remove${type}`
    api
      .updateData(
        "order",
        {
          [remove]: 1,
        },
        {
          orderNum: req.body.orderNum
        }
      )
      .then(() => {
        res.send({ msg: "删除订单成功", status: 1400 });
      })
      .catch((err) => {
        console.log("err ==> ", err);
        res.send({ msg: "删除订单失败", status: 1401 });
      });
  }
};
