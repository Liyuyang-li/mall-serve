//会员 获取用户信息
module.exports = (req, res) => {
    // console.log('req.userId==>',req.uid)
   api.findData('member',{
       userId:req.uid
   },['userId','email','gender','nickName','avatar','signature','createdAt','updatedAt']).then(result=>{
       res.send({msg:'获取用户信息成功',status:1240,data:result,staticBaseUrl:`${config.staticBaseUrl.url}${config.staticBaseUrl.base}/userImgs/`})
   }).catch(err=>{
       console.log('err==>',err);
       res.send({msg:'获取用户信息失败',status:1241})
   })
}