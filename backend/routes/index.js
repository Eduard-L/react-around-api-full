const mainRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { auth } = require('../middelwares/auth');

const { cardsRouter } = require('./cards');
const { usersRouter } = require('./users');
const { nonExcistPage } = require('./notFound');
const { login } = require('../controllers/login');

const { createUser } = require('../controllers/createUser');

mainRouter.post('/signup', celebrate({
  body: Joi.object().keys({

    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),

  }).unknown(true),
}), createUser);

mainRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),

  }),
}), login);
mainRouter.use(auth);

mainRouter.use('/users', usersRouter);

mainRouter.use('/cards', cardsRouter);

mainRouter.use(nonExcistPage);

module.exports = mainRouter;
