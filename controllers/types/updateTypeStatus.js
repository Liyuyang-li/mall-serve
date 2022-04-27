//manage 修改类型状态
module.exports = (req, res) => {
  // console.log("req.body==>", req.body);
  //把商品类型数据存在数据库,使用事务处理
  api
    .updateData('type',
      { status: req.body.status },
      {
        typeId: req.body.typeId,
      }
    )
    .then((result) => {
      res.send({ msg: "修改类型状态成功", status: 1070, data: {result,status:req.body.status} });
    })
    .catch((err) => {
      res.send({ msg: "修改类型状态失败", status: 1071 });
    });
};
