const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth/authentification')


router.post('/login', auth.login);

router.post('/signup', auth.adminExist, auth.signUp);

router.post('/isAdmin', auth.isAdmin);


module.exports = router;
