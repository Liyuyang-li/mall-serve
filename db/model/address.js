//member会员地址模型
const {Model,DataTypes} = require('sequelize');
class Address extends Model {}
Address.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      comment: "表id",
    },
    addressId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "",
      unique: true,
      comment: "会员地址唯一Id",
    },
    name: {
        type: DataTypes.STRING(25),
        allowNull: false,
        defaultValue: "",
        comment: "姓名",
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "",
        comment: "电话",
      },
    province: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "",
      comment: "省份",
    },
    city: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "",
      comment: "市",
    },
    county: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "",
      comment: "区县",
    },
    addressDetail: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "",
      comment: "详细地址",
    },
    areaCode: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "",
      comment: "地区编号",
    },
    postalCode: {
      type: DataTypes.STRING(6),
      allowNull: false,
      defaultValue: "",
      comment: "邮政编码",
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "0: 非默认地址, 1: 默认地址",
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
    // modelName: "Address",
    //强制表名称等于模型名称
    // freezeTableName: true,
    // 直接提供表名
    tableName: 'address',
  }
);
(async () => {
  //模型同步,true将创建表,如果表已经存在,则将其首先删除
  await Address.sync({ force: false });
})();

//导出User模型
module.exports = Address;