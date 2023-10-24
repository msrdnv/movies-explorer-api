const router = require('express').Router();

const { validateUpdateUserInfo } = require('../middlewares/validators');
const { getUserInfo, updateUserInfo } = require('../controllers/users');

router.get('/me', getUserInfo);
router.patch('/me', validateUpdateUserInfo, updateUserInfo);

module.exports = router;
