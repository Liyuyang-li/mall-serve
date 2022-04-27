//manage 删除商品类型
const { Op } = require("sequelize");
module.exports = (req, res) => {
    console.log('req.body.typeIds==>',req.body.typeIds)
    // res.send({msg: '删除商品类型数据成功', status: 1100 });
    api.updateData('type',{
        remove:1
    },{
        typeId: {
          [Op.in]: req.body.typeIds
        }
    }).then(result => {
        res.send({msg: '删除商品类型数据成功', status: 1100 , data:result});
    }).catch(err=>{
        console.log('err=>',err);
        res.send({msg: '删除商品类型数据失败', status: 1101});
    })
}