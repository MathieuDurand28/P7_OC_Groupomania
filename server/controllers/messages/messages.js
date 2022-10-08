const Database = require('../../database/database')
const {Message} = require('../../models/Message')
const accents = require('remove-accents');
const fs = require('fs')


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Fonction utilisant Sequelize pour récupérer les messages de la BDD
 */
exports.getMessage =  async function (req,res) {
    const all_posts = await Message.findAll()
    res.status(200).json({all_posts})
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Fonction utilisant Sequelize pour enregistrer un message dans la BDD
 */
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
                imageSrc: data.fileName 
            })
            .then((create) => {
                const new_message = Message.findOne({ where: { id: create.id } })
                    res.status(200).json({
                    message: new_message.message,
                    author: new_message.author,
                    id: new_message.id,
                    time: new_message.updatedAt
        })
            })
        })
        } catch (error) {
        console.error('Unable to connect to the database:', error)
        }
    
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Fonction utilisant Sequelize pour modifier un message dans la BDD
 */
exports.updateMessage =  async function (req,res) {
    const data = req.body
    try {
        await Database.sequelize.authenticate()
        .then(() => {
            Message.findOne({where: {id: data.id}})
            .then((msg) => {
                msg.message = data.message
                msg.save()
                res.status(200).json({message: "message updaté"})
            })
        })
        .catch((err) => res.status(400).json({err: err}))

    } catch (error) {
        console.error('Unable to connect to the database:', error)
        }
   
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Fonction utilisant Sequelize pour supprimer un message de la BDD
 */
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

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Fonction utilisant Sequelize pour aimer un message dans la BDD
 */
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

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Fonction utilisant Sequelize pour récupérer les informations [userLike] d'un message en particulier.
 */
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

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Fonction utilisant Sequelize & mv pour:
 *  - changer le nom d'un fichier entrant avec un timestamp 
 *  - stocker une image dans public/images
 *  - stocker dans la BDD le nom de l'image dans le champs imageSrc
 */
exports.postImage = async function (req,res) {
    const image = req.files.myFile

    const MIME_TYPES = {
        'image/jpg': 'jpg',
        'image/jpeg': 'jpg',
        'image/png': 'png'
      };
      
    const name = Date.now()
    const extension = MIME_TYPES[image.mimetype]
    const full_name = name + '.' + extension
    const path = 'public/images/' + name + '.' + extension


  image.mv(path, (error) => {
    if (error) {
      console.error(error)
      res.writeHead(500, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify({ status: 'error', message: error }))
      return
    }

    res.writeHead(200, {
      'Content-Type': 'application/json'
    })
    res.end(JSON.stringify({ status: 'success', path: 'images' + image.name, name: name, full_name: full_name }))
  })
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Fonction utilisant Sequelize & fs pour:
 *  - supprimer un fichier dans public/images
 *  - supprimer la donnée imageSrc du message sélectionné
 */
exports.suppressImage = async function (req,res) {
    const data = req.body
    const messageId = data.msgId
    const imageSrc = data.image
    const path = 'public/images/'
    
    try{
        fs.unlink(path+imageSrc, err => {
            if (err) {
                res.status(400).json({err: err})
            } else {
                Database.sequelize.authenticate()
                .then(() => {
                    Message.findOne({where: {id: messageId}})
                    .then((msg) => {
                        msg.imageSrc = ""
                        msg.save()
                        if (msg.message.length <= 0){
                            Message.destroy({where: {id: messageId}})
                        }
                    })
                })
            }
          })
        res.status(200).json({message: "ok", id: messageId})
    }
    catch {
        res.status(400).json({err: 'erreur'})
    }
    

}



