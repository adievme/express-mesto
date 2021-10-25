const { celebrate, Joi } = require('celebrate');
const { validator } = require('validator');

const userValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{2,32})[^\s@]*/),
  }),
});

const loginValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const userUpdateValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const avatarUpdateValidate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{2,32})[^\s@]*/).required(),
  }),
});

const idValidate = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

const validateURL = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new Error('Неправильный формат ссылки');
  }
  return value;
};

const cardValidate = celebrate({
  body: Joi.object().keys({
    link: validateURL,
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports = {
  userValidate,
  loginValidate,
  userUpdateValidate,
  avatarUpdateValidate,
  idValidate,
  cardValidate,
};
