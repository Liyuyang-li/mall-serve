//会员 是否收藏
module.exports = (req, res) => {
  //截取参数
  let params = req.body;
  let userId = req.uid;
  console.log("params==>", params, req.uid);
  api
    .findData("memberLiked", { ...params,userId,remove:0},['userId','productId'])
    .then((result) => {
      res.send({ msg: "已收藏", status: 1330 ,data:result});
    })
    .catch((err) => {
      console.log("err ==> ", err);
      res.send({ msg: "未收藏", status: 1331 });
    });
};
