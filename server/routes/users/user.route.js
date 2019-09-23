const router = require("express").Router();
const userService = require("../../services/users");
const room = require("../../socket/room")

router.post('/', (req, res) => {
  try {
    const {login, password} = req.body;
    if (!login || !password) {
      throw {status: 400, msg: 'missing data'}
    }
    const user = userService.createUser(login, password)
    return res.status(200).send({state: 'succeed', data: user})
  } catch (e) {
    if (e.status) {
      return res.status(e.status).send({sate: 'error', data: e.msg})
    }
    return res.status(500).send({sate: 'error', data: e})
  }
})

/**
 * @swagger
 * /user/{uid}:
 *   get:
 *     tags:
 *       - User
 *     description: Get one user by uid
 *     parameters:
 *       - in: path
 *         name: uid
 *         description: unique in users
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *      200:
 *        description: 'user'
 *      400:
 *        description: 'missing data'
 *      403:
 *        description: 'no-user-found'
 *      500:
 *        description: 'error server'
 *
 */
router.get('/:uid', (req, res) => {
  try {
    const uid = req.params.uid;
    if (!uid) {
      throw {status: 400, msg: 'missing data'}
    }
    const user = userService.getOneUserByUid(uid);
    if (!user) {
      throw {status: 400, msg: 'no-user-found'}
    }
    return res.status(200).send(user)
  } catch (e) {
    if (e.status) {
      return res.status(e.status).send(e.msg)
    }
    return res.status(500).send(e)
  }
})

module.exports = router;
