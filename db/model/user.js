//user模型
const {Model,DataTypes} = require('sequelize');
class User extends Model {}
User.init(
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
      unique: true,
      comment: "用户唯一Id",
    },
    email: {
        type: DataTypes.STRING(25),
        allowNull: false,
        defaultValue: "",
        comment: "邮箱",
    },
    password: {
        type: DataTypes.STRING(32),
        allowNull: false,
        defaultValue: "",
        comment: "密码",
      },
    gender: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 2,
      comment: "性别(0女，1男，2未知)",
    },
    phone: {
      type: DataTypes.STRING(11),
      allowNull: false,
      defaultValue: "",
      comment: "手机号",
    },
    nickName: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "",
      comment: "昵称",
    },
    avatar: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "default.jpg",
      comment: "头像路径",
    },

  },
  {
    //连接的实例
    sequelize,
    //选择的模型的名称,
    // modelName: "User",
    //强制表名称等于模型名称
    // freezeTableName: true,
    // 直接提供表名
    tableName: 'user',
  }
);
(async () => {
  //模型同步,true将创建表,如果表已经存在,则将其首先删除
  await User.sync({ force: false });
})();

//导出User模型
module.exports = User;