const express = require('express');
const router = express.Router();

const messages = require('../controllers/messages/messages')
const authentified = require('../middlewares/auth')


router.get('/getMessages', messages.getMessage);

router.post('/postMessages', messages.postMessage);

module.exports = router;
