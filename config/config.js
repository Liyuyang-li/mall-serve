let env = process.env.NODE_ENV; 
console.log('env==>',env);
module.exports = require(path.resolve(__basename,`config/config.${env}.js`));
