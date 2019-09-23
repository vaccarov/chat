const Messages = require("../fake.data").Messages;

function addOneMessage(user, msg) {
  Messages.push({user, msg})
  return {user, msg}
}

function getAllMessages() {
  return Messages
}


module.exports = {
  addOneMessage,
  getAllMessages
}
