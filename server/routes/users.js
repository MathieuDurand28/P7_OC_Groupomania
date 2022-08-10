var express = require('express');
var router = express.Router();

const auth = require('../controllers/auth/authentification')


router.post('/login', auth.login);

router.post('/signup', auth.signUp);

module.exports = router;
