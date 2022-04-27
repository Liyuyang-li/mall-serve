//manage 修改商城公告
module.exports = (req, res) => {
  // console.log("req.body==>", req.body);
  //把商品类型数据存在数据库,使用事务处理
  let acArr  = req.body.acArr;
  api
    .updateDatas("announcement", acArr, [
      "text"
    ])
    .then((result) => {
      res.send({
        msg: "修改公告成功",
        status: 1200
      });
    })
    .catch((err) => {
      res.send({ msg: "修改用户公告失败", status: 1201 });
    });
};
