//商店公告模型
const {Model,DataTypes} = require('sequelize');
class Announcement extends Model {}
Announcement.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      comment: "表id",
    },
    acId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "",
      unique: true,
      comment: "公告唯一Id",
    },
    text: {
      type: DataTypes.STRING(300),
      allowNull: false,
      defaultValue: "",
      // unique: true,
      comment: "公告内容",
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
    // modelName: "Announcement",
    //强制表名称等于模型名称
    // freezeTableName: true,
    // 直接提供表名
    tableName: 'Announcement',
  }
);
(async () => {
  //模型同步,true将创建表,如果表已经存在,则将其首先删除
  await Announcement.sync({ force: false });
})();

//导出User模型
module.exports = Announcement;