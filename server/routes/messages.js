const express = require('express');
const router = express.Router();
const messages = require('../controllers/messages/messages');
const authentified = require('../middlewares/auth')


router.post('/getMessages', authentified, messages.getMessage)

router.post('/postMessages',  authentified,messages.postMessage)

router.post('/postImage',  messages.postImage)

router.post('/deleteMessage',  authentified, messages.deleteMessage)

router.put('/updateMessage',  authentified, messages.updateMessage)

router.post('/likeMessage',  authentified, messages.likeManager)

router.post('/alreadyLike',  authentified, messages.alreadyLike)

router.post('/suppressImage',  authentified, messages.suppressImage)


module.exports = router;
