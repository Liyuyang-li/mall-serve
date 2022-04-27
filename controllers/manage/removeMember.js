//manage 删除会员
// const { Op } = require("sequelize");
module.exports = (req, res) => {
    api.updateData('member',{
        remove:1
    },{
        userId: req.body.userId
    }).then(result => {
        res.send({msg: '删除用户成功', status: 1180 , data:result});
    }).catch(err=>{
        console.log('err=>',err);
        res.send({msg: '删除用户失败', status: 1181});
    })
}