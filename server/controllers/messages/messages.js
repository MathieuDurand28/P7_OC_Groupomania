const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Database = require('../../database/database')
const {Message} = require('../../models/Message');


exports.getMessage =  async function (req,res) {
    const all_posts = await Message.findAll()
    res.status(200).json({all_posts})
}

exports.postMessage =  async function (req,res){
    const data = req.body
   
    try {
        await Database.sequelize.authenticate()
        .then(() => {
            const user = Message.create({
                message: data.message,
                author: data.author,
                like: 0,
                Dislike: 0
            })
            .then((create) => {
                const new_message = Message.findOne({ where: { id: create.id } })
                    res.status(200).json({
                    message: new_message.message,
                    author: new_message.author,
                    id: new_message.id
        })
            })
        })
        } catch (error) {
        console.error('Unable to connect to the database:', error)
        }
    
}
