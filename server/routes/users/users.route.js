const router = require("express").Router();
const userService = require("../../services/users");


/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - User
 *     description: List of all users
 *     parameters:
 *     produces:
 *       - application/json
 *     responses:
 *      200:
 *        description: 'user'
 *      500:
 *        description: 'error server'
 *
 */
router.get('', (req, res) => {
  try {
    const users = userService.getAll()
    return res.status(200).send({state: 'succeed', data: users})
  } catch (e) {
    if (e.status) {
      return res.status(e.status).send({sate: 'error', data: e.msg})
    }
    console.error('get all users', e);
    return res.status(500).send({sate: 'error', data: e})
  }
})

module.exports = router;

