//user模型
const {Model,DataTypes} = require('sequelize');
class ProductSku extends Model {}
ProductSku.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      comment: "表id",
    },
    skuId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "",
      unique: true,
      comment: "商品sku唯一Id",
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "",
      comment: "商品唯一Id",
    },
    version: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: "",
      comment: "商品版本",
    },
    color: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: "",
      comment: "商品颜色",
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
      comment: "组合价格",
    },
    img: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: "",
      comment: "商品图片路径",
    },
    remove:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "是否删除",
    },
  },
  {
    //连接的实例
    sequelize,
    //选择的模型的名称,
    // modelName: "ProductSku",
    //强制表名称等于模型名称
    // freezeTableName: true,
    // 直接提供表名
    tableName: 'product_sku',
  }
);
(async () => {
  //模型同步,true将创建表,如果表已经存在,则将其首先删除
  await ProductSku.sync({ force: false });
})();

//导出User模型
module.exports = ProductSku;