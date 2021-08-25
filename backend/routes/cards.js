const router = require('express').Router();
const { validateCardId, validateCardCreation } = require('../middlewares/validation');

const {
  getCards,
  createCard,
  deleteCard,
  setLike,
  deleteLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', validateCardCreation, createCard);
router.delete('/:cardId', validateCardId, deleteCard);
router.put('/:cardId/likes', validateCardId, setLike);
router.delete('/:cardId/likes', validateCardId, deleteLike);

module.exports = router;
