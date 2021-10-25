const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  idValidate,
  cardValidate,
} = require('../validator/validator');

router.get('/', getCards);
router.post('/', cardValidate, createCard);
router.delete('/:cardId', idValidate, deleteCard);
router.put('/:cardId/likes', idValidate, likeCard);
router.delete('/:cardId/likes', idValidate, dislikeCard);

module.exports = router;
