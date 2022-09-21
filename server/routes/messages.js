const express = require('express');
const router = express.Router();

const messages = require('../controllers/messages/messages')
const authentified = require('../middlewares/auth')


router.post('/getMessages', authentified, messages.getMessage)

router.post('/postMessages',  authentified, messages.postMessage)

router.post('/deleteMessage',  authentified, messages.deleteMessage)

router.post('/likeMessage',  authentified, messages.likeManager)

module.exports = router;
