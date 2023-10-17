const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const returnUserInfo = (data) => ({
  email: data.email, name: data.name,
});

module.exports.login = (req, res, next) => {
  User.findUser(req.body.email, req.body.password)
    .then((user) => {
      const token = jwt.sign({ _id: user.id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    }))
    .then((data) => res.status(201).send(returnUserInfo(data)))
    .catch(next);
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((data) => res.send(returnUserInfo(data)))
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { email: req.body.email, name: req.body.email },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((data) => res.send(returnUserInfo(data)))
    .catch(next);
};
