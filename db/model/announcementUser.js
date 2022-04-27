//商家公告和商家用户
const {Model,DataTypes} = require('sequelize');
class AnnouncementUser extends Model {}
AnnouncementUser.init(
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
    acId: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: '',
        comment: "公告id",
      },

  },
  {
    //连接的实例
    sequelize,
    //选择的模型的名称,
    // modelName: "AnnouncementUser",
    //强制表名称等于模型名称
    // freezeTableName: true,
    // 直接提供表名
    tableName: 'Announcement_user',
  }
);
(async () => {
  //模型同步,true将创建表,如果表已经存在,则将其首先删除
  await AnnouncementUser.sync({ force: false });
})();

//导出User模型
module.exports = AnnouncementUser;