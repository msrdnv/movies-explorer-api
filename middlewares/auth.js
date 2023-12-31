const jwt = require('jsonwebtoken');
const UnautorizedError = require('../utils/UnautorizedError');
const { messages } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnautorizedError(messages.unauthorizedError));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new UnautorizedError(messages.unauthorizedError));
  }
  req.user = payload;
  return next();
};
