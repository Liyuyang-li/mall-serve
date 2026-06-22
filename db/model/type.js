//商品类型模型
const {Model,DataTypes} = require('sequelize');
class Type extends Model {}
Type.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      comment: "表id",
    },
    typeId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "",
      unique: true,
      comment: "类型唯一Id",
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "",
      // unique: true,
      comment: "类型唯一名称",
    },
    parentId: {
      type: DataTypes.STRING(36),
      allowNull: true,
      defaultValue: null,
      comment: "父级类型ID,顶级为null",
    },
    remove: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "删除状态",
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        comment: "状态",
      },
    pic: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      comment: "类型图片",
    },

  },
  {
    //连接的实例
    sequelize,
    //选择的模型的名称,
    // modelName: "Type",
    //强制表名称等于模型名称
    // freezeTableName: true,
    // 直接提供表名称
    tableName: 'type',
  }
);
(async () => {
  //模型同步,true将创建表,如果表已经存在,则将其首先删除
  await Type.sync({ alter: true});
})();

//导出User模型
module.exports = Type;