const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth/authentification')
const authentified = require('../middlewares/auth')


router.post('/login', auth.login);

router.post('/signup', auth.adminExist, auth.signUp);

router.post('/isAdmin', auth.isAdmin);

router.post('/isLoggedUser', authentified, auth.isLoggedUser);



module.exports = router;
