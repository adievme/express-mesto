const User = require('../models/user');

const getUsers = (req, res) => {
  return User.find({})
    .then(users => res.status(200).send(users))
    .catch(() => {
      res.status(500).send({ message: 'На сервере произошла ошибка' })
    })
};

const getUser = (req, res) => {
  return User.findById(req.params.id)
    .then(user => res.status(200).send(user))
    .catch(() => {
      if (res.status(404)) {
        return res.send({ message: "Пользователь по указанному _id не найден" })
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' })
    })
};

const createUser = (req, res) => {
  return User.create({ ...req.body })
    .then(user => res.status(200).send(user))
    .catch(() => {
      if (res.status(400)) {
        return res.send({ message: "Переданы некорректные данные при создании пользователя" })
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' })
    })
};

const updateUser = (req, res) => {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true } // обработчик then получит на вход обновлённую запись
  )
    .then(user => res.status(200).send(user))
    .catch(() => {
      if (res.status(400)) {
        return res.send({ message: "Переданы некорректные данные при обновлении профиля" })
      }
      if (res.status(404)) {
        return res.send({ message: "Пользователь с указанным _id не найден" })
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' })
    })
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true } // обработчик then получит на вход обновлённую запись
  )
    .then(avatar => res.status(200).send(avatar))
    .catch(() => {
      if (res.status(400)) {
        return res.send({ message: "Переданы некорректные данные при обновлении аватара" })
      }
      if (res.status(404)) {
        return res.send({ message: "Пользователь с указанным _id не найден" })
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' })
    })
};

module.exports = { getUsers, getUser, createUser, updateUser, updateUserAvatar };