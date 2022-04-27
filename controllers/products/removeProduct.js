//manage 删除商品
const { Op } = require("sequelize");
module.exports = (req, res) => {
    api.updateData('product',{
        remove:1
    },{
        productId: {
          [Op.in]: req.body.productIds
        }
    }).then(result => {
        res.send({msg: '删除商品数据成功', status: 1180 , data:result});
    }).catch(err=>{
        console.log('err=>',err);
        res.send({msg: '删除商品数据失败', status: 1181});
    })
}