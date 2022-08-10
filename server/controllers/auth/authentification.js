const bcrypt = require('bcrypt');
const Database = require('../../database/database')
const {User} = require('../../models/User');


exports.login =  function(req,res){
const data = req.body

const check_email    = typeof (data.email) !== 'undefined'
const check_password = typeof (data.password) !== 'undefined'

if (check_email && check_password){
    User.findAll()
    .then((t) => {res.status(200).json({message: t})})
} else {
    res.status(401).json({message: `Une erreur est survenue`})
}

}

exports.signUp =  async function (req,res){
    const data = req.body
    const check_email    = typeof (data.email) !== 'undefined'
    const check_password = typeof (data.password) !== 'undefined'

    if (check_email && check_password){
        const encryptage = await encrypt(data.password).then((r) => {return r})
        const mail = data.email
        try {
            await Database.sequelize.authenticate()
            .then(() => {
                const user = User.create({
                    email: mail,
                    password: encryptage,
                    isAdmin: true
                })
                //Database.sequelize.sync()
            })
          } catch (error) {
            console.error('Unable to connect to the database:', error)
          }
        
        res.status(200).json({success: true, message: 'pass'})
    } else {
        res.status(401).json({message: `Une erreur est survenue lors de la création du compte.`})
    }
}

function encrypt(password){
    return bcrypt.hash(password, 10)
}