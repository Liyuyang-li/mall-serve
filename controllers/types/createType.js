//manage 创建商品类型
module.exports = (req, res) => {
  //获取用户id
  let uid = req.uid;
  //生成类型id
  let tid = "t_" + new Date().getTime();
  console.log("uid==>", req.uid, req.body, tid);
  //把商品类型数据存在数据库,使用事务处理
  api
    .transactionData(async (t) => {
      //商品类型基础数据
      await api.createData(
        "type",
        {
          typeId: tid,
          name: req.body.name,
          status: req.body.status,
        },
        t
      );
      //用户和商品类型关系数据
      await api.createData(
        "typeUser",
        {
          userId: uid,
          typeId: tid,
        },
        t
      );
    })
    .then((result) => {
      res.send({ msg: "创建商品类型成功", status: 1040, data: result });
    })
    .catch((err) => {
      res.send({ msg: "创建商品类型失败", status: 1041, data: err });
    });
};
