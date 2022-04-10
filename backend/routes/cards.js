const cardsRouter = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const { validateURL } = require('../helpers/validaotrs');

const {
  getCardsById, getCards, createCard, deleteCard, likeCard, disLikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);

cardsRouter.get('/:id', celebrate({

  params: Joi.object().keys({
    id: Joi.string().required().alphanum().length(24),
  }),
}), getCardsById);

cardsRouter.post('/', celebrate({
  body: Joi.object().keys({

    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL),

  }),
}), createCard);

cardsRouter.delete('/:id', celebrate({

  params: Joi.object().keys({
    id: Joi.string().required().alphanum().length(24),
  }),
}), deleteCard);

cardsRouter.put('/:id/likes', celebrate({

  params: Joi.object().keys({
    id: Joi.string().required().alphanum().length(24),
  }),
}), likeCard);

cardsRouter.delete('/:id/likes', celebrate({

  params: Joi.object().keys({
    id: Joi.string().required().alphanum().length(24),
  }),
}), disLikeCard);

module.exports = { cardsRouter };
