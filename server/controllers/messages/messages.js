const Database = require('../../database/database')
const {Message} = require('../../models/Message')



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

            const arrayLikes = message.usersLiked.split(";")

            if (arrayLikes.length <= 1){
                message.usersLiked = userWhoLiked+";"
                message.like += 1
                message.save()
            } else {
                let newArrayOfString = ""
                let findLike = false

                arrayLikes.map((likes, index) => {
                    if (likes == userWhoLiked) {
                        arrayLikes.splice(index,1)
                        message.like > 0 ? message.like -= 1 : message.ike = 0
                        message.save()
                        findLike = true
                    }
                })

                if (!findLike){
                    arrayLikes.push(userWhoLiked)
                    message.like += 1
                    message.save()
                }

                arrayLikes.map((likesToString) => {
                    if (likesToString !== ""){
                        newArrayOfString += likesToString+";"
                    }
                    
                })

                message.usersLiked = newArrayOfString
                message.save()
            }


            res.status(200).json({message: "usersLikedString"})
        })
        .catch((err) => console.log(err))

    } catch (error) {
        res.status(400).json({err: error})
    }
}

exports.alreadyLike = async function (req,res) {
    const data = req.body
    const messageId = data.msgId
    const userWhoLiked = data.userId
    let already = false
    try{
        const message = await Message.findOne({where: {id: messageId}})
    const arrayLikes = message.usersLiked.split(";")

    arrayLikes.map((search) => {
        if (search == userWhoLiked){
            already = true
        }
    })
    res.status(200).json({like: already, messageId: messageId})
    }
    catch {
        res.status(400).json({err: 'erreur'})
    }
    

}
