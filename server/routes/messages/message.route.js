const socket = require("../../socket/room");
const messageService = require('../../services/messages')
const router = require('express').Router()

/**
 * @swagger
 * /messages:
 *   post:
 *     tags:
 *       - Message
 *     description: Post one message
 *     parameters:
 *       - in: params
 *         name: msg
 *         description: message
 *         type: object
 *     produces:
 *       - application/json
 *     responses:
 *      200:
 *        description: 'message'
 *      400:
 *        description: 'missing data'
 *      500:
 *        description: 'error server'
 *
 */

router.post('/', (req, res) => {
  try {
    const user = req.user;
    const msg = req.body.msg;
    if (!msg) {
      throw {status: 400, msg: 'missing data'}
    }
    const message = messageService.addOneMessage(user, msg);
    socket.send('messages', messageService.getAllMessages())
    return  res.status(200).send(message)
  } catch (e) {
    if (e.status) {
      return res.status(e.status).send({sate: 'error', data: e.msg})
    }
    return res.status(500).send({sate: 'error', data: e})
  }

})


module.exports = router;
