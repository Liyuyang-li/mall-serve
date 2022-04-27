//manage 根据typeId编辑商品类型数据
module.exports = (req, res) => {
    console.log('req.body==>',req.body)
    let typeId = req.body.typeId;
    delete req.body.typeId;
    api.updateData('type', req.body, {
      typeId,
    }).then(result => {
      res.send({msg: '编辑商品类型数据保存成功', status: 1090, data: result});
    }).catch(err => {
      console.log('err ==> ', err);
      res.send({msg: '编辑商品类型数据保存失败', status: 1091});
    })
}