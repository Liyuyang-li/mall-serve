//manage 创建公告
module.exports = (req, res) => {
  //获取用户id
  let uid = req.uid;
  let acArr  = req.body.acArr;
  console.log('acArr==>',acArr);
  let arr = [];
  acArr.forEach(v => {
    delete v.id;
    delete v.createdAt
    let obj = {
      acId:v.acId,
      userId:uid
    }
    arr.push(obj);
  });
  api
    .transactionData(async (t) => {
      //商品类型基础数据
      await api.createDatas(
        "announcement",
        acArr,
        t
      );
      //用户和商品类型关系数据
      await api.createDatas(
        "announcementUser",
        arr,
        t
      );
    })
    .then((result) => {
      res.send({ msg: "修改公告成功", status: 1200, data: result });
    })
    .catch((err) => {
      res.send({ msg: "修改公告失败", status: 1221, data: err });
    });
};
