const router = require('express').Router();
const { validateUserUpdate, validateAvatarUpdate, validateUserId } = require('../middlewares/validation');

const {
  getUsers,
  getUser,
  getCurrentUser,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', validateUserId, getUser);
router.patch('/me', validateUserUpdate, updateUser);
router.patch('/me/avatar', validateAvatarUpdate, updateUserAvatar);

module.exports = router;
