//模型层
//收编所有模型
const user = require(path.resolve(__basename,'db/model/user.js'));
const validCode = require(path.resolve(__basename,'db/model/validCode.js'));
const type = require(path.resolve(__basename,'db/model/type.js'));
const typeUser = require(path.resolve(__basename,'db/model/typeUser.js'));
const product = require(path.resolve(__basename,'db/model/product.js'));
const productType = require(path.resolve(__basename,'db/model/productType.js'));
const productUser = require(path.resolve(__basename,'db/model/productUser.js'));
const member = require(path.resolve(__basename,'db/model/member.js'));
const validCodeMember = require(path.resolve(__basename,'db/model/validCodeMember.js'));
const memberUser = require(path.resolve(__basename,'db/model/memberUser.js'));
const address = require(path.resolve(__basename,'db/model/address.js'));
const memberAddress = require(path.resolve(__basename,'db/model/memberAddress.js'));
const memberLiked = require(path.resolve(__basename,'db/model/memberLiked.js'));
const productSku = require(path.resolve(__basename,'db/model/productSku.js'));
const order = require(path.resolve(__basename,'db/model/order.js'));
const memberOrder = require(path.resolve(__basename,'db/model/memberOrder.js'));
const announcement = require(path.resolve(__basename,'db/model/announcement.js'));
const announcementUser = require(path.resolve(__basename,'db/model/announcementUser.js'));


module.exports = {
    user,
    validCode,
    type,
    typeUser,
    //商品信息
    product,
    //商品和类型关系
    productType,
    //商品和用户关系
    productUser,
    //会员用户
    member,
    //会员验证码
    validCodeMember,
    //会员和商家的关系
    memberUser,
    //会员地址
    address,
    //会员地址和会员关系
    memberAddress,
    //用户收藏商品
    memberLiked,
    //商品规格
    productSku,
    //订单列表
    order,
    //订单和会员关系
    memberOrder,
    //公告
    announcement,
    announcementUser

}