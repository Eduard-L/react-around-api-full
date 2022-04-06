const usersRouter = require('express').Router();

const { validateURL } = require('../helpers/validaotrs')

const { celebrate, Joi } = require('celebrate');

const {
  deleteUser, getUsersData, getUserById, updateUserInfo, updateUserAvatar, getUserInfo
} = require('../controllers/users');

usersRouter.get('/', getUsersData);

usersRouter.post('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),


  })
}), getUserInfo);

usersRouter.get('/:id', celebrate({

  params: Joi.object().keys({
    id: Joi.string().required().alphanum().length(24),
  })
}), getUserById);

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(15),
    about: Joi.string().required().min(2).max(15)

  })
}), updateUserInfo);

usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL)
  })
}), updateUserAvatar);

usersRouter.delete('/:id', celebrate({

  params: Joi.object().keys({
    id: Joi.string().required().alphanum().length(24),
  })
}), deleteUser);

module.exports = { usersRouter };
