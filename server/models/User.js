const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:")

module.exports = (sequelize) => {
    return sequelize.define("User", {
    email:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    underscored: true
    });
}

console.log(sequelize.model.User)

