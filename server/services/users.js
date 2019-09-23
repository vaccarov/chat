const usersData = require('../fake.data').Users

function getOneUserByUid(uid) {
  return usersData.find(user => user.uid === uid)
}

function getAll() {
  return usersData
}

function getOneByLogin(login) {
  return usersData.find(user => user.login === login)
}

function getOneByLoginAndPassword(login, password) {
  return usersData.find(user => user.login === login && user.password === password)
}

function createUser(login, password) {
  try {
    const user = {
      uid: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      login,
      password
    }
    usersData.push(user)
    return user
  } catch (e) {
    throw e
  }
}

module.exports = {
  getOneUserByUid,
  getAll,
  createUser,
  getOneByLoginAndPassword,
  getOneByLogin
}
