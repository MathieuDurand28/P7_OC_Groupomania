const Sequelize = require('sequelize')

/**
 * Déclaration de la base de données. 
 */
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: __dirname+'/groupomania_db.sqlite',
})
var exports = module.exports = {};
exports.sequelize = sequelize;