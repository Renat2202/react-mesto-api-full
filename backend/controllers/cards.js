const Card = require('../models/card');
const ValidationError = require('../errors/validation-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('user')
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const owner = req.user._id;

  const { name, link } = req.body;

  Card.create({
    name,
    link,
    owner,
  })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при создании карточки'));
        return;
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (card === null) {
        throw new NotFoundError('Карточка по указанному _id не найдена.');
      }
      if (card.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError('Нет прав на удаление карточки');
      } else {
        Card.findByIdAndRemove(cardId)
          .then((deletedCard) => {
            res.status(200).send(deletedCard);
          });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Невалидный id'));
        return;
      }
      next(err);
    });
};

module.exports.setLike = (req, res, next) => {
  const currentUser = req.user._id;

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: currentUser } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (card === null) {
        throw new NotFoundError('Карточка по указанному _id не найдена.');
      }

      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Невалидный id'));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные для постановки лайка'));
        return;
      }
      next(err);
    });
};

module.exports.deleteLike = (req, res, next) => {
  const currentUser = req.user._id;

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: currentUser } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        throw new NotFoundError('Карточка по указанному _id не найдена.');
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Невалидный id'));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные для снятия лайка'));
        return;
      }
      next(err);
    });
};
