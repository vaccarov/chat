const router = require("express").Router();
const userService = require("../../services/users");
const messageService = require("../../services/messages");
const socket = require("../../socket/room");

/**
 * @swagger
 * /auth:
 *   get:
 *     tags:
 *       - Auth
 *     description: Authenticate one user already existing
 *     parameters:
 *       - in: query
 *         name: login
 *         description: unique in users
 *         type: string
 *       - in: query
 *         name: password
 *         description: not encoded
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *      200:
 *        description: 'user'
 *      400:
 *        description: 'missing argument'
 *      403:
 *        description: 'no-user'
 *      500:
 *        description: 'error server'
 *
 */
router.get('/', (req, res) => {
  try {
    const {login, password} = req.query
    if (!login || !password) {
      throw {status: 400, msg: 'missing argument'}
    }
    const user = userService.getOneByLoginAndPassword(login, password);
    if (!user) {
      throw {status: 403, msg: 'no-user'}
    }
    initRoom()
    return res.status(200).send({state: 'succeed', data: user})
  } catch (e) {
    console.error(e)
    if (e.status) {
      return res.status(e.status).send({sate: 'error', data: e.msg})
    }
    return res.status(500).send({sate: 'error', data: e})
  }
})

/**
 * @swagger
 * /auth:
 *   post:
 *     tags:
 *       - Auth
 *     description: Create and Authenticate one user
 *     parameters:
 *       - in: params
 *         name: login
 *         description: unique in users
 *         type: string
 *       - in: params
 *         name: password
 *         description: not encoded
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *      200:
 *        description: 'user'
 *      400:
 *        description: 'missing argument'
 *      403:
 *        description: 'password-wrong-confirmation'
 *      409:
 *        description: 'login-already-exists'
 *      500:
 *        description: 'error server'
 *
 */

router.post('/', (req, res) => {
  try {
    const {login, password1, password2} = req.body
    if (!login || !password1 || !password2) {
      throw {status: 400, msg: 'missing argument'}
    }
    if (password1 !== password2) {
      throw {status: 403, msg: 'password-wrong-confirmation'}
    }
    const loginAlreadyExists = userService.getOneByLogin(login);
    if (loginAlreadyExists) {
      throw {status: 409, msg: 'login-already-exists'}
    }
    const user = userService.createUser(login, password1)
    initRoom()
    return res.status(200).send({state: 'succeed', data: user})
  } catch (e) {
    console.error(e)
    if (e.status) {
      return res.status(e.status).send({sate: 'error', data: e.msg})
    }
    return res.status(500).send({sate: 'error', data: e})
  }
})

function initRoom() {
  socket.send('users', userService.getAll())
  socket.send('messages', messageService.getAllMessages())
}

module.exports = router;
