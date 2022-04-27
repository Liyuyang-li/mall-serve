//服务层
//API层
//操作mysql
const { QueryTypes } = require("sequelize");
const { Op } = require("sequelize");
class API {
  //插入数据api
  createData(modelName, values, t) {
    //t需要事务处理标记
    if (t) {
      return model[modelName].create(values, { transaction: t });
    } else {
      return model[modelName].create(values);
    }
  }

  //批量插入数据api
  createDatas(modelName, values, t) {
    //values 数组
    //t需要事务处理标记
    if (t) {
      return model[modelName].bulkCreate(values, { transaction: t });
    } else {
      return model[modelName].bulkCreate(values);
    }
  }

  //查询数据api
  findData(modelName, conditions, attributes) {
    return model[modelName].findAll({
      where: conditions,
      attributes: attributes,
    });
  }

  //修改数据(逻辑删除)
  updateData(modelName, values, conditions) {
    //modelName:模型名字 String
    //values:要修改的数据 object
    //conditions:修改条件 Object
    // console.log("updateData==>", modelName, values, conditions);
    return model[modelName].update(values, {
      where: conditions,
    });
  }

  //批量修改数据(逻辑删除)
  updateDatas(modelName, values, conditions) {
    //modelName:模型名字 String
    //values:要修改的数据 Array
    //conditions:修改条件字段 Array
      return model[modelName].bulkCreate(values, {
        updateOnDuplicate: conditions,
      });
  }

  //删除数据
  deleteData(modelName, conditions) {
    //modelName:模型名字 String
    //conditions:条件 Object
    return model[modelName].destroy({
      where: conditions,
    });
  }

  //事务处理
  transactionData(fn) {
    //回调函数fn
    return sequelize.transaction(fn);
  }

  //原始查询
  queryData(sql, type, replacements) {
    //sql:sql语句
    //type:查询类型
    //replacements:替换属性
    return sequelize.query(sql, {
      type: QueryTypes[type],
      replacements,
    });
  }

  //多个相同id查询
  // SELECT * FROM post WHERE authorId = 12 OR authorId = 13;
  findDataByids(modelName, conditions) {
    return model[modelName].findAll({
      where: {
        productId: conditions,
        // [
        //   { authorId: 12 },
        //   { authorId: 13 }
        // ]
      },
    });
  }

  //多个相同id查询
  // SELECT * FROM post WHERE authorId = 12 OR authorId = 13;
  findOrderByids(modelName, conditions) {
    return model[modelName].findAll({
      where: {
        orderId: conditions,
        // [
        //   { authorId: 12 },
        //   { authorId: 13 }
        // ]
      },
    });
  }
}
module.exports = new API();
