const usersRouter = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const { validateURL } = require('../helpers/validaotrs');

const {
  deleteUser, getUsersData, getUserById, updateUserInfo, updateUserAvatar, getUserInfo,
} = require('../controllers/users');


usersRouter.get('/', getUsersData);

usersRouter.get('/me', getUserInfo);

usersRouter.get('/:id', celebrate({

  params: Joi.object().keys({
    id: Joi.string().required().alphanum().length(24)
      .hex(),
  }),
}), getUserById);

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),

  }),
}), updateUserInfo);

usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL),
  }),
}), updateUserAvatar);

usersRouter.delete('/:id', celebrate({

  params: Joi.object().keys({
    id: Joi.string().required().alphanum().length(24)
      .hex(),
  }),
}), deleteUser);

module.exports = { usersRouter };
