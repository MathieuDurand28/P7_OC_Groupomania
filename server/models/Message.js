const { ARRAY } = require("sequelize");
const { Sequelize, Model, DataTypes } = require("sequelize");
const Database = require('../database/database')


const Message = Database.sequelize.define("Message", {
    message:{
        type: DataTypes.STRING
    },
    author:{
        type: DataTypes.STRING,
        allowNull: false
    },
    like:{
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0
    },
    userId:{
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0
    },
    usersLiked: {
        type : DataTypes.STRING,
        allowNull: true,
        defaultValue: ""
    },
    imageSrc: {
        type : DataTypes.STRING,
        allowNull: true,
        defaultValue: ""
    },
    createdUtcDate: {
        type : DataTypes.STRING,
        allowNull: true,
        defaultValue: ""
    },
    updatedUtcDate: {
        type : DataTypes.STRING,
        allowNull: true,
        defaultValue: ""
    },
    createdTimestamp: {
        type : DataTypes.STRING,
        allowNull: true,
        defaultValue: ""
    },
    updatedTimestamp: {
        type : DataTypes.STRING,
        allowNull: true,
        defaultValue: ""
    },

    },{timestamps: false})

exports.Message = Message