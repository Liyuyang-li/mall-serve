//manage 修改用户账号状态
module.exports = (req, res) => {
  // console.log("req.body==>", req.body);
  //把商品类型数据存在数据库,使用事务处理
  api
    .updateData('member',
      { status: req.body.status },
      {
        userId: req.body.userId
      }
    )
    .then((result) => {
      res.send({ msg: "修改用户账号状态成功", status: 1170, data: {result,status:req.body.status} });
    })
    .catch((err) => {
      res.send({ msg: "修改用户账号状态失败", status: 1171 });
    });
};
