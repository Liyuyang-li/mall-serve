//商品类型模型
const {Model,DataTypes} = require('sequelize');
class TypeUser extends Model {}
TypeUser.init(
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
      comment: "用户Id",
    },
    typeId: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: '',
        comment: "类型id",
      },

  },
  {
    //连接的实例
    sequelize,
    //选择的模型的名称,
    // modelName: "TypeUser",
    //强制表名称等于模型名称
    // freezeTableName: true,
    // 直接提供表名
    tableName: 'type_user',
  }
);
(async () => {
  //模型同步,true将创建表,如果表已经存在,则将其首先删除
  await TypeUser.sync({ force: false });
})();

//导出User模型
module.exports = TypeUser;