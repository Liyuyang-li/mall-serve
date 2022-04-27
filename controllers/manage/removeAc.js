//manage 删除会员
// const { Op } = require("sequelize");
module.exports = (req, res) => {
    api.updateData('announcement',{
        remove:1
    },{
        acId: req.body.acId
    }).then(result => {
        res.send({msg: '删除公告成功', status: 1180 , data:result});
    }).catch(err=>{
        console.log('err=>',err);
        res.send({msg: '删除公告失败', status: 1181});
    })
}