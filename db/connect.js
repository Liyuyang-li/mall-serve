//sequelize 连接实例
const { Sequelize } = require('sequelize');
module.exports = new Sequelize(config.mysqlOptions.database, config.mysqlOptions.user, config.mysqlOptions.password, {
    host: config.mysqlOptions.host,
    dialect: config.mysqlOptions.dialect,
    define: {
        underscored: config.mysqlOptions.underscored
    },
    timezone: config.mysqlOptions.timezone
});