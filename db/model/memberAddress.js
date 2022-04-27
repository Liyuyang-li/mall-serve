//商品类型模型
const { Model, DataTypes } = require("sequelize");
class memberAddress extends Model {}
memberAddress.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      comment: "表id",
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "",
      comment: "会员用户Id",
    },
    addressId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "",
      comment: "地址id",
    },
  },
  {
    //连接的实例
    sequelize,
    //选择的模型的名称,
    // modelName: "memberAddress",
    //强制表名称等于模型名称
    // freezeTableName: true,
    // 直接提供表名
    tableName: "member_address",
  }
);
(async () => {
  //模型同步,true将创建表,如果表已经存在,则将其首先删除
  await memberAddress.sync({ force: false });
})();

//导出User模型
module.exports = memberAddress;
