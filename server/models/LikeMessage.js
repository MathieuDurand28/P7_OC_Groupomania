const { Sequelize, Model, DataTypes } = require("sequelize");
const Database = require('../database/database')


const LikeMessage = Database.sequelize.define("LikeMessage", {
    userId:{
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0
    },
    msgId: {
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0
    }
    })

exports.LikeMessage = LikeMessage