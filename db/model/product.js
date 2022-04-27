//user模型
const {Model,DataTypes} = require('sequelize');
class Product extends Model {}
Product.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      comment: "表id",
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "",
      unique: true,
      comment: "商品唯一Id",
    },
    name: {
        type: DataTypes.STRING(25),
        allowNull: false,
        defaultValue: "",
        comment: "商品名称",
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
        comment: "商品价格",
      },
    orPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
      comment: "商品原价格",
    },
    unit: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "",
      comment: "商品单位",
  },
    sales: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "",
      comment: "商品销量",
    },
    kucun: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "",
      comment: "商品库存",
    },
    img: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: "",
      comment: "商品图片路径",
    },
    detailImg: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: "",
      comment: "详情图片",
    },
    desc: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: "",
      comment: "商品描述",
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "状态",
    },
    remove:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "是否删除",
    },
    isbanner:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "是否轮播商品",
    },
    isquickselect:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "是否快速选择商品",
    },
    isrecommend:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "是否推荐商品",
    },
  },
  {
    //连接的实例
    sequelize,
    //选择的模型的名称,
    // modelName: "Product",
    //强制表名称等于模型名称
    // freezeTableName: true,
    // 直接提供表名
    tableName: 'product',
  }
);
(async () => {
  //模型同步,true将创建表,如果表已经存在,则将其首先删除
  await Product.sync({ force: false });
})();

//导出User模型
module.exports = Product;