//控制层
//收编所有控制器
let register = require(path.resolve(__basename,'controllers/users/register.js'));
let sendValidCode = require(path.resolve(__basename,'controllers/users/sendValidCode.js'));
let login = require(path.resolve(__basename,'controllers/users/login.js'));
let getUserInfo = require(path.resolve(__basename,'controllers/users/getUserInfo.js'));
//types
let createType = require(path.resolve(__basename,'controllers/types/createType.js'));
let findTypeList = require(path.resolve(__basename,'controllers/types/findTypeList.js'));
let updateTypeStatus = require(path.resolve(__basename,'controllers/types/updateTypeStatus.js'));
let findtypeByTypeId = require(path.resolve(__basename,'controllers/types/findtypeByTypeId.js'));
let saveEditType = require(path.resolve(__basename,'controllers/types/saveEditType.js'));
let removeType = require(path.resolve(__basename,'controllers/types/removeType.js'));
let getTypeCount = require(path.resolve(__basename,'controllers/types/getTypeCount.js'));
//products
let postProduct = require(path.resolve(__basename,'controllers/products/postProduct.js'));
let getTypeData = require(path.resolve(__basename,'controllers/products/getTypeData.js'));
let findProductList = require(path.resolve(__basename,'controllers/products/findProductList.js'));
let getProductCount = require(path.resolve(__basename,'controllers/products/getProductCount.js'));
let updateProductStatus = require(path.resolve(__basename,'controllers/products/updateProductStatus.js'));
let removeProduct = require(path.resolve(__basename,'controllers/products/removeProduct.js'));
let removeSku = require(path.resolve(__basename,'controllers/products/removeSku.js'));
let findProductByProductId = require(path.resolve(__basename,'controllers/products/findProductByProductId.js'));
let findskuByProductId = require(path.resolve(__basename,'controllers/products/findskuByProductId.js'));
let saveEditProduct = require(path.resolve(__basename,'controllers/products/saveEditProduct.js'));
let updateProductBanner = require(path.resolve(__basename,'controllers/products/updateProductBanner.js'));

//members
let memberRegister = require(path.resolve(__basename,'controllers/members/memberRegister.js'));
let memberSendValidCode = require(path.resolve(__basename,'controllers/members/memberSendValidCode.js'));
let memberLogin = require(path.resolve(__basename,'controllers/members/memberLogin.js'));
let memberGetUserInfo = require(path.resolve(__basename,'controllers/members/memberGetUserInfo.js'));
let saveEditMember = require(path.resolve(__basename,'controllers/members/saveEditMember.js'));
let addAddress = require(path.resolve(__basename,'controllers/members/addAddress.js'));
let getAddressList = require(path.resolve(__basename,'controllers/members/getAddressList.js'));
let getAddressByid = require(path.resolve(__basename,'controllers/members/getAddressByid.js'));
let saveEditAddress = require(path.resolve(__basename,'controllers/members/saveEditAddress.js'));
let removeAddress = require(path.resolve(__basename,'controllers/members/removeAddress.js'));
let updatePassword = require(path.resolve(__basename,'controllers/members/updatePassword.js'));
let getAllProducts = require(path.resolve(__basename,'controllers/members/getAllProducts.js'));
let getProductByProductId = require(path.resolve(__basename,'controllers/members/getProductByProductId.js'));
let addLiked = require(path.resolve(__basename,'controllers/members/addLiked.js'));
let findIsLiked = require(path.resolve(__basename,'controllers/members/findIsLiked.js'));
let removeLiked = require(path.resolve(__basename,'controllers/members/removeLiked.js'));
let getLikedList = require(path.resolve(__basename,'controllers/members/getLikedList.js'));
let getBannerProduct = require(path.resolve(__basename,'controllers/members/getBannerProduct.js'));
let findProduct = require(path.resolve(__basename,'controllers/members/findProduct.js'));
let addOrder = require(path.resolve(__basename,'controllers/members/addOrder.js'));
let getOrderList = require(path.resolve(__basename,'controllers/members/getOrderList.js'));
let saveOrderCount = require(path.resolve(__basename,'controllers/members/saveOrderCount.js'));
let removeOrder = require(path.resolve(__basename,'controllers/members/removeOrder.js'));
let updateOrder = require(path.resolve(__basename,'controllers/members/updateOrder.js'));
let forgetPassword = require(path.resolve(__basename,'controllers/members/forgetPassword.js'));
let findAcList = require(path.resolve(__basename,'controllers/members/findAcList.js'));

let getCartCount = require(path.resolve(__basename,'controllers/manage/getCartCount.js'));
let getCartList = require(path.resolve(__basename,'controllers/manage/getCartList.js'));
let getorderLists = require(path.resolve(__basename,'controllers/manage/getorderLists.js'));
let getorderCount = require(path.resolve(__basename,'controllers/manage/getorderCount.js'));
let updateOrderType = require(path.resolve(__basename,'controllers/manage/updateOrder.js'));
let getUserList = require(path.resolve(__basename,'controllers/manage/getUserList.js'));
let updateMemberStatus = require(path.resolve(__basename,'controllers/manage/updateMemberStatus.js'));
let removeMember = require(path.resolve(__basename,'controllers/manage/removeMember.js'));
let getMemberByid = require(path.resolve(__basename,'controllers/manage/getMemberByid.js'));
let getAddressListByid = require(path.resolve(__basename,'controllers/manage/getAddressListByid.js'));
let getUserCount = require(path.resolve(__basename,'controllers/manage/getUserCount.js'));
let addAnnouncement = require(path.resolve(__basename,'controllers/manage/addAnnouncement.js'));
let getAcList = require(path.resolve(__basename,'controllers/manage/getAcList.js'));
let updateAc = require(path.resolve(__basename,'controllers/manage/updateAc.js'));
let removeAc = require(path.resolve(__basename,'controllers/manage/removeAc.js'));

let test = require(path.resolve(__basename,'controllers/members/test.js'));



module.exports = {
    //商家注册控制器
    register,
    //发送验证码
    sendValidCode,
    //登录
    login,
    
    //创建商品类型
    createType,
    //查找商品类型列表
    findTypeList,
    //修改类型状态
    updateTypeStatus,
    //根据typeId查询商品类型数据
    findtypeByTypeId,
    //保存编辑的商品类型数据
    saveEditType,
    //删除商品类型
    removeType,
    //查询商品类型数量
    getTypeCount,
    //获取用户信息
    getUserInfo,

    //发布商品
    postProduct,
    //获取商品类型数据
    getTypeData,
    //获取商品数据
    findProductList,
    //获取商品数量
    getProductCount,
    //更改商品状态
    updateProductStatus,
    //删除商品
    removeProduct,
    //删除规格
    removeSku,
    //根据商品id查找商品数据
    findProductByProductId,
    //根据商品id查找商品规格
    findskuByProductId,
    //保存编辑的商品数据
    saveEditProduct,
    //商品是否轮播
    updateProductBanner,

    //会员注册
    memberRegister,
    //会员注册发送验证码
    memberSendValidCode,
    //会员登录
    memberLogin,
    //获取会员信息
    memberGetUserInfo,
    //保存会员修改的信息
    saveEditMember,
    //添加会员地址
    addAddress,
    //获取地址列表
    getAddressList,
    //根据addressId获取地址
    getAddressByid,
    //保存修改的地址
    saveEditAddress,
    //删除地址
    removeAddress,
    //修改密码
    updatePassword,
    //获取所有商品
    getAllProducts,
    //根据商品Id
    getProductByProductId,
    //收藏商品
    addLiked,
    //是否收藏
    findIsLiked,
    //取消收藏
    removeLiked,
    //获取收藏商品列表
    getLikedList,
    //获取轮播商品
    getBannerProduct,
    //搜索商品
    findProduct,
    //添加订单
    addOrder,
    //获取订单
    getOrderList,
    //修改购物车数量
    saveOrderCount,
    //删除购物车
    removeOrder,
    //生成订单
    updateOrder,
    //获取公告
    findAcList,

    //获取购物车数量
    getCartCount,
    //获取购物车列表
    getCartList,
    //获取订单列表
    getorderLists,
    //获取订单数量
    getorderCount,
    //修改是否发货
    updateOrderType,
    //获取用户列表
    getUserList,
    //修改用户账号状态
    updateMemberStatus,
    //删除会员
    removeMember,
    //根据userId获取用户信息
    getMemberByid,
    //根据userId获取用户收货地址
    getAddressListByid,
    //获取用户数量
    getUserCount,

    //忘记密码
    forgetPassword,
    //添加公告
    addAnnouncement,
    //获取公告列表
    getAcList,
    //更新公告列表
    updateAc,
    //删除公告列表
    removeAc,

    //测试
    test,
}