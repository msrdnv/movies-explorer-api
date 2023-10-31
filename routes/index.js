const router = require('express').Router();

const users = require('./users');
const movies = require('./movies');

const { validateLogin, validateCreateUser } = require('../middlewares/validators');
const auth = require('../middlewares/auth');

const { login, createUser } = require('../controllers/users');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);
router.use(auth);
router.use('/users', users);
router.use('/movies', movies);

module.exports = router;
