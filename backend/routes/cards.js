const cardsRouter = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const { validateURL } = require('../helpers/validaotrs');

const {
  getCardsById, getCards, createCard, deleteCard, likeCard, disLikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);

cardsRouter.get('/:id', celebrate({

  params: Joi.object().keys({
    id: Joi.string().required().alphanum().length(24)
      .hex(),
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
    id: Joi.string().required().alphanum().length(24)
      .hex(),
  }),
}), deleteCard);

cardsRouter.put('/:id/likes', celebrate({

  params: Joi.object().keys({
    id: Joi.string().required().alphanum().length(24)
      .hex(),
  }),
}), likeCard);

cardsRouter.delete('/:id/likes', celebrate({

  params: Joi.object().keys({
    id: Joi.string().required().alphanum().length(24)
      .hex(),
  }),
}), disLikeCard);

module.exports = { cardsRouter };
