//商品订单模型，包含购物车
const {Model,DataTypes} = require('sequelize');
class Order extends Model {}
Order.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      comment: "表id",
    },
    orderId:{
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "",
      unique:true,
      comment: "订单唯一Id",
    },
    orderNum:{
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "",
      comment: "订单编号",
    },
    skuId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "",
      comment: "商品sku唯一Id",
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "",
      comment: "商品唯一Id",
    },
    addressId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "",
      comment: "地址唯一Id",
    },
    count: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "",
      comment: "商品数量",
    },
    type:{
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: '',
      comment: "订单类型（0购物车,1未付款，2待发货，3收货中，4待评价）",
    },
    remove0:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "是否删除",
    },
    remove1:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "是否删除",
    },
    remove2:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "是否删除",
    },
    remove3:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "是否删除",
    },
    remove4:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "是否删除",
    },
    remove5:{
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
    // modelName: "Order",
    //强制表名称等于模型名称
    // freezeTableName: true,
    // 直接提供表名
    tableName: 'order',
  }
);
(async () => {
  //模型同步,true将创建表,如果表已经存在,则将其首先删除
  await Order.sync({ force: false });
})();

//导出User模型
module.exports = Order;