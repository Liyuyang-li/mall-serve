//商品类型模型
const { Model, DataTypes } = require("sequelize");
class memberLiked extends Model {}
memberLiked.init(
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
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "",
      comment: "商品Id",
    },
    remove: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "删除状态",
    },
  },
  {
    //连接的实例
    sequelize,
    //选择的模型的名称,
    // modelName: "memberLiked",
    //强制表名称等于模型名称
    // freezeTableName: true,
    // 直接提供表名
    tableName: "member_liked",
  }
);
(async () => {
  //模型同步,true将创建表,如果表已经存在,则将其首先删除
  await memberLiked.sync({ force: false });
})();

//导出User模型
module.exports = memberLiked;
