//nalidcode 验证码模型
const {Model,DataTypes} = require('sequelize');
class ValidCodeMember extends Model {}
ValidCodeMember.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      comment: "表id",
    },
    email: {
      type: DataTypes.STRING(25),
      allowNull: false,
      defaultValue: "",
      comment: "邮箱",
    },
    codeId: {
      type: DataTypes.STRING(25),
      allowNull: false,
      defaultValue: "",
      unique: true,
      comment: "验证码Id",
    },
    validCode: {
        type: DataTypes.STRING(12),
        allowNull: false,
        defaultValue: "",
        comment: "验证码",
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
    tableName: 'valid_code_member',
  }
);
(async () => {
  //模型同步,true将创建表,如果表已经存在,则将其首先删除
  await ValidCodeMember.sync({ force: false });
})();

//导出User模型
module.exports = ValidCodeMember;