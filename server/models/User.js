const { Sequelize, Model, DataTypes } = require("sequelize");
const Database = require('../database/database')


const User = Database.sequelize.define("User", {
    email:{
        type: DataTypes.STRING,
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
    //underscored: true
    });

exports.User = User
