// 用户获取订单列表
module.exports = (req, res) => {
    api
      .updateData(
        "order",
        {
          type: req.body.type,
        },
        {
          orderNum:req.body.orderNum
        }
      )
      .then(() => {
          res.send({ msg: "修改订单成功", status: 1410 }); 
      })
      .catch((err) => {
        console.log("err ==> ", err);
        res.send({ msg: "生成订单失败", status: 1411 });
      });
   
};
