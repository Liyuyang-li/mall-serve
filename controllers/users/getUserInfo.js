//manage 获取用户信息
module.exports = (req, res) => {
    // console.log('req.userId==>',req.uid)
   api.findData('user',{
       userId:req.uid
   },['userId','email','phone','gender','nickName','avatar','createdAt','updatedAt']).then(result=>{
       res.send({msg:'获取用户信息成功',status:1120,data:result,staticBaseUrl:`${config.staticBaseUrl.url}${config.staticBaseUrl.base}/userImgs/`})
   }).catch(err=>{
       console.log('err==>',err);
       res.send({msg:'获取用户信息失败',status:1121})
   })
}