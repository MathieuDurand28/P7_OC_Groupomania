const bcrypt = require('bcrypt');
const { Sequelize} = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const User = require('../../models/User')(sequelize,Sequelize);

User.sync({force: true})

exports.login =  function(req,res){
const data = req.body

const check_email    = typeof (data.email) !== 'undefined'
const check_password = typeof (data.password) !== 'undefined'

if (check_email && check_password){
    const all = User.findAll()

    res.status(200).json({message: all})
} else {
    res.status(401).json({message: `Une erreur est survenue`})
}

}

exports.signUp =  async function (req,res){
    const data = req.body
    const check_email    = typeof (data.email) !== 'undefined'
    const check_password = typeof (data.password) !== 'undefined'


    if (check_email && check_password){
        const mail = data.email
        const pass = "hash"
        try{
            const user = await User.create({
                email: mail,
                password: pass,
                isAdmin: true
            })
        }
        catch{
            res.status(200).json({success: false, err: "erreur"}) 
        }
        
        res.status(200).json({success: true, message: ""})
    } else {
        res.status(401).json({message: `Une erreur est survenue lors de la création du compte.`})
    }
}

const encrypt = () => {
    bcrypt.genSalt(10, function(err, salt) {
        const hasher = () => bcrypt.hash(req.body.password, salt, function (err, hash) {
            return hash
        });
        return hasher
    });
}