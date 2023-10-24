const mongoose = require('mongoose');
const httpConstants = require('http2').constants;
const BadRequestError = require('../utils/BadRequestError');
const UnautorizedError = require('../utils/UnautorizedError');
const ForbiddenError = require('../utils/ForbiddenError');
const { messages } = require('../utils/constants');

module.exports.handleErrors = ((err, req, res, next) => {
  if (err instanceof mongoose.Error.CastError
    || err instanceof mongoose.Error.ValidationError
    || err instanceof BadRequestError) {
    res.status(httpConstants.HTTP_STATUS_BAD_REQUEST).send({ message: messages.badRequestError });
    return;
  }
  if (err instanceof UnautorizedError) {
    res.status(httpConstants.HTTP_STATUS_UNAUTHORIZED).send({ message: err.message });
    return;
  }
  if (err instanceof ForbiddenError) {
    res.status(httpConstants.HTTP_STATUS_FORBIDDEN).send({ message: err.message });
    return;
  }
  if (err instanceof mongoose.Error.DocumentNotFoundError) {
    res.status(httpConstants.HTTP_STATUS_NOT_FOUND)
      .send({ message: messages.documentNotFoundError });
    return;
  }
  if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
    res.status(httpConstants.HTTP_STATUS_CONFLICT).send({ message: messages.emailConflictError });
    return;
  }
  console.error(err);
  res.status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
    .send({ message: messages.serverError });
  next();
});
