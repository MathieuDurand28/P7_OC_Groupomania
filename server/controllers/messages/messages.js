const Database = require('../../database/database')
const {Message} = require('../../models/Message')
const {LikeMessage} = require('../../models/LikeMessage')


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
                userId: data.userId,
                like: 0,
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

exports.deleteMessage =  async function (req,res) {
    const data = req.body
    try {
        await Database.sequelize.authenticate()
        .then(() => {
            const user = Message.destroy({where: {id: data.id}})
            LikeMessage.destroy({where: {msgId: data.id}})
            res.status(200).json({message: "message supprimé"})
        })
        .catch((err) => res.status(400).json({err: err}))

    } catch (error) {
        console.error('Unable to connect to the database:', error)
        }
   
}

exports.likeManager =  async function (req,res) {
    const data = req.body
    const userWhoLiked = data.userId
    const messageId = data.msgId

    try {
        await Database.sequelize.authenticate()
        .then(async () => {
            const message = await Message.findOne({where: {id: messageId}})

            const alreadyLiked = await LikeMessage.findAll({where: {userId: userWhoLiked}})

            if (alreadyLiked == null || alreadyLiked.length <= 0){
                LikeMessage.create({
                    msgId: messageId,
                    userId: userWhoLiked
                })
                message.like += 1
                message.save()
            } else {
                let find = false
                alreadyLiked.map((like) => {
                    if (like.msgId == messageId){
                        LikeMessage.destroy({where: {userId: like.userId}})
                        find = true
                    }
                })
                if (!find){
                    LikeMessage.create({
                        userId: userWhoLiked,
                        msgId: messageId
                    })
                    message.like += 1
                    message.save()
                } else{
                    message.like > 0 ? message.like -= 1 : message.like = 0
                    message.save()
                }
            }
            res.status(200).json({message: "like manager ok "})
        })
        .catch((err) => res.status(400).json({err: err}))

    } catch (error) {
        res.status(400).json({err: error})
    }


   
}
