const usersService = require('./services/users')

const whiteList = ['auth', 'api']
const authenticate = async (req, res, next) => {
  try {
    if (checkWhiteList(req.url)) {
      return next();
    }
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
      throw {error: 'Unauthorized'};
    }

    const idToken = req.headers.authorization.split('Bearer ')[1];
    const user = usersService.getOneUserByUid(idToken)
    if (user) {
      req.user = user;
      return next();
    }
  } catch (e) {
    return res.status(401).send({
      status: 'failed', data: {error: 'invalid auth'}
    });
  }
};

function checkWhiteList(url) {
  return whiteList.some(urlWhitelist => url.includes(urlWhitelist))
}

module.exports = {
  authenticate
}
