const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth/authentification')
const authentified = require('../middlewares/auth')


router.post('/login', auth.login);

router.post('/signup', auth.signUp);

router.post('/isAdmin', auth.isAdmin);

router.get('/isConnected', authentified, (req,res) => {
    res.status(200).json({authentified: true})
});

module.exports = router;
