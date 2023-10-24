const httpConstants = require('http2').constants;
const { messages } = require('../utils/constants');

module.exports.handleNotFoundPage = (req, res) => {
  res.status(httpConstants.HTTP_STATUS_NOT_FOUND).send({ message: messages.notFoundError });
};
