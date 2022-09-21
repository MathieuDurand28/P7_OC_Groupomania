const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Database = require('../../database/database')
const {User} = require('../../models/User')
require('dotenv').config()

exports.adminExist = async function (res,req,next) {
    const adminAlreadyCreated = await User.findOne({ where: { email: process.env.ADMIN_EMAIL } })
    if (adminAlreadyCreated !== null){
        next()
    } else {
        const encryptage = await encrypt(process.env.ADMIN_PASSWORD).then((r) => {return r})
        try {
            await Database.sequelize.authenticate()
            .then(() => {
                const user = User.create({
                    email: process.env.ADMIN_EMAIL,
                    password: encryptage,
                    isAdmin: true
                })
            })
            next()
          } catch (error) {
            console.error('Unable to connect to the database:', error)
          }
    }
}

exports.login =  async function (req,res) {
const data = req.body

const check_email    = typeof (data.email) !== 'undefined'
const check_password = typeof (data.password) !== 'undefined'

if (check_email && check_password){
    const login = await User.findOne({ where: { email: data.email } })
    if (login !== null){
        const password_checker = await bcrypt.compare(data.password , login.password);
        if (password_checker){
            res.status(200).json({
                email: data.email,
                user_id: login.id,
                isAdmin: login.isAdmin,
                token: jwt.sign(
                    { 
                        userId: login.id,
                        email: login.email,
                        isAdmin: login.isAdmin
                     },
                    process.env.TOKEN_KEY,
                    { expiresIn: '24h' }
                  ),
            })
        } else {
            res.status(200).json({message: `Identifiants incorrects. Merci de réessayer.`})
        }
    } else {
        res.status(200).json({message: `Identifiants incorrects. Merci de réessayer.`})
    }
} else {
    res.status(401).json({message: `Une erreur est survenue`})
}

}

exports.signUp =  async function (req,res){
    const data = req.body
    const check_email    = typeof (data.email) !== 'undefined'
    const check_password = typeof (data.password) !== 'undefined'

    if (check_email && check_password){
        const check_user_exist = await User.findOne({ where: { email: data.email } })
        if (check_user_exist === null) {
            const encryptage = await encrypt(data.password).then((r) => {return r})
            const mail = data.email
            try {
                await Database.sequelize.authenticate()
                .then(() => {
                    const user = User.create({
                        email: mail,
                        password: encryptage,
                    })
                })
              } catch (error) {
                console.error('Unable to connect to the database:', error)
              }
              const new_user = await User.findOne({ where: { email: data.email } })
              res.status(200).json({
                email: new_user.email,
                user_id: new_user.id,
                isAdmin: new_user.isAdmin,
                token: jwt.sign(
                    { 
                        userId: new_user.id,
                        email: new_user.email,
                        isAdmin: new_user.isAdmin
                     },
                    process.env.TOKEN_KEY,
                    { expiresIn: '24h' }
                  ),
                })
        } else {
            res.status(200).json({success: false, message: 'Un compte ayant cette adresse mail existe déjà.'})
        }
    } else {
        res.status(401).json({message: `Une erreur est survenue lors de la création du compte.`})
    }    
}

exports.isAdmin = async function (req,res){
    const data = req.body
    const user = await User.findOne({ where: { email: data.email } })
    res.status(200).json({isAdmin: user.isAdmin })
}

function encrypt(password){
    return bcrypt.hash(password, 10)
}