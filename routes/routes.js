//路由层

//导入控制器层
let controller = require(path.resolve(__basename,'controllers/controller.js'));

//导出执行的路由
module.exports = app =>{
    app.post('/register',controller.register);

    app.post('/sendValidCode',controller.sendValidCode);

    app.post('/login',controller.login);

    app.post('/createType',controller.createType);

    app.get('/findTypeList',controller.findTypeList);

    app.post('/updateTypeStatus',controller.updateTypeStatus);

    app.get('/findtypeByTypeId',controller.findtypeByTypeId);

    app.post('/saveEditType',controller.saveEditType);

    app.post('/removeType',controller.removeType);
   
    app.get('/getTypeCount',controller.getTypeCount);

    app.get('/getUserInfo',controller.getUserInfo);
    
    app.post('/postProduct',controller.postProduct);

    app.get('/getTypeData',controller.getTypeData);

    app.get('/findProductList',controller.findProductList);

    app.get('/getProductCount',controller.getProductCount);

    app.post('/updateProductStatus',controller.updateProductStatus);

    app.post('/updateProductBanner',controller.updateProductBanner);

    app.post('/removeProduct',controller.removeProduct);

    app.post('/removeSku',controller.removeSku);

    app.get('/findProductByProductId',controller.findProductByProductId);

    app.get('/findskuByProductId',controller.findskuByProductId);

    app.post('/saveEditProduct',controller.saveEditProduct);
    
    app.post('/memberRegister',controller.memberRegister);

    app.post('/memberSendValidCode',controller.memberSendValidCode);
 
    app.post('/memberLogin',controller.memberLogin);

    app.get('/memberGetUserInfo',controller.memberGetUserInfo);
    
    app.post('/saveEditMember',controller.saveEditMember);

    app.post('/addAddress',controller.addAddress);

    app.get('/getAddressList',controller.getAddressList);

    app.get('/getAddressByid',controller.getAddressByid);
    
    app.post('/saveEditAddress',controller.saveEditAddress);
    
    app.post('/removeAddress',controller.removeAddress);
    
    app.post('/updatePassword',controller.updatePassword);

    app.get('/getAllProducts',controller.getAllProducts);

    app.get('/getProductByProductId',controller.getProductByProductId);

    app.post('/addLiked',controller.addLiked);

    app.post('/findIsLiked',controller.findIsLiked);

    app.post('/removeLiked',controller.removeLiked);

    app.get('/getLikedList',controller.getLikedList);

    app.get('/getBannerProduct',controller.getBannerProduct);

    app.get('/findProduct',controller.findProduct);

    app.post('/addOrder',controller.addOrder);

    app.get('/getOrderList',controller.getOrderList);

    app.post('/saveOrderCount',controller.saveOrderCount);

    app.post('/removeOrder',controller.removeOrder);

    app.post('/updateOrder',controller.updateOrder);

    app.get('/getCartCount',controller.getCartCount);

    app.get('/getCartList',controller.getCartList);

    app.get('/getorderLists',controller.getorderLists);
    
    app.get('/getorderCount',controller.getorderCount);
    
    app.post('/updateOrderType',controller.updateOrderType);

    app.get('/getUserList',controller.getUserList);
    
    app.post('/updateMemberStatus',controller.updateMemberStatus);

    app.post('/removeMember',controller.removeMember);
    
    app.get('/getMemberByid',controller.getMemberByid);

    app.get('/getAddressListByid',controller.getAddressListByid);
    
    app.get('/getUserCount',controller.getUserCount);

    app.post('/forgetPassword',controller.forgetPassword);

    app.post('/addAnnouncement',controller.addAnnouncement);

    app.get('/getAcList',controller.getAcList);

    app.post('/updateAc',controller.updateAc);

    app.post('/removeAc',controller.removeAc);

    app.get('/findAcList',controller.findAcList);

    app.get('/test',controller.test);






}