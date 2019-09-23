const router = require("express").Router();
const user = require("./users/user.route");
const users = require("./users/users.route");
const auth = require("./users/auth.route");
const messages = require("./messages/message.route");



router.get('/', (req, res) => res.end('ping'))
router.use('/auth', auth)
router.use('/messages', messages)
router.use('/user', user)
router.use('/users', users)


module.exports = router;
