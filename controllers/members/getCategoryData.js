// 获取商品类型数据（无需token验证）
module.exports = (req, res) => {
  let sql =
    "SELECT `t`.`type_id` AS `typeId`, `t`.`name`, `t`.`status`, `t`.`parent_id` AS `parentId`, `t`.`pic`, `t`.`created_at` AS `createdAt`,`t`.`updated_at` AS `updatedAt` FROM `type` AS `t` WHERE `t`.`remove` = 0 AND `t`.`status` = 1";
  
  api
    .queryData(sql, "SELECT", {})
    .then((result) => {
      // 返回两级结构
      const parentTypes = result.filter(item => !item.parentId);
      const childTypes = result.filter(item => item.parentId);
      
      parentTypes.forEach(parent => {
        parent.children = childTypes.filter(child => child.parentId === parent.typeId);
      });
      
      res.send({ msg: "获取商品类型数据成功", status: 1140, data: result.length > 0 ? parentTypes : result });
    })
    .catch((err) => {
      res.send({ msg: "获取商品类型数据失败", status: 1141 });
    });
};
