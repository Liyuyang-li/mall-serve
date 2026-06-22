// 上传类型图片
module.exports = (req, res) => {
  console.log('req.body==>', req.body);
  
  if (!req.body.img || !req.body.imgType) {
    return res.send({ msg: '请上传图片', status: 2001 });
  }

  // 上传图片
  utils.uploadTypeImg(req.body.img, req.body.imgType)
    .then(filename => {
      // 返回完整的图片URL
      const imgUrl = `${config.staticBaseUrl.base}/typeImgs/${filename}`;
      res.send({ msg: '上传成功', status: 200, data: { url: imgUrl } });
    })
    .catch(err => {
      console.log('err ==> ', err);
      res.send({ msg: '上传失败', status: 2002 });
    });
};
