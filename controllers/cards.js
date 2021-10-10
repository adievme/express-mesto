const Card = require('../models/card');

const getCards = (req, res) => {
  return Card.find({})
    .then(cards => res.status(200).send(cards))
    .catch(() => {
      res.status(500).send({ message: 'На сервере произошла ошибка' })
    });
};

const createCard = (req, res) => {
  return Card.create({ owner: req.user._id, ...req.body })
  .then(card => res.status(200).send(card))
  .catch(() => {
    if (res.status(400)) {
      return res.send({ message: "Переданы некорректные данные при создании карточки" })
    }
    return res.status(500).send({ message: 'На сервере произошла ошибка' })
  })
};

const deleteCard = (req, res) => {
  return Card.findByIdAndRemove(req.params.cardId)
    .then(card => res.status(200).send(card))
    .catch(() => {
      if (res.status(404)) {
        return res.send({ message: "Карточка с указанным _id не найдена" })
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' })
    })
};

const likeCard = (req, res) => {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then(card => res.status(200).send(card))
    .catch(() => {
      if (res.status(400)) {
        return res.send({ message: "Переданы некорректные данные для постановки лайка" })
      }
      if (res.status(404)) {
        return res.send({ message: "Передан несуществующий _id карточки" })
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' })
    })
};

const dislikeCard = (req, res) => {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },  // убрать _id из массива
    { new: true }
  )
    .then(card => res.status(200).send(card))
    .catch(() => {
      if (res.status(400)) {
        return res.send({ message: "Переданы некорректные данные для снятия лайка" })
      }
      if (res.status(404)) {
        return res.send({ message: "Передан несуществующий _id карточки" })
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' })
    })
}

module.exports = { getCards, createCard, deleteCard, likeCard, dislikeCard };