// handlers for sending data to the user // async opertaion

const Card = require('../models/card');

const { User } = require('../utils/constants');

const { NotFoundError, BadRequestError, ForbiddentError } = require('../utils/errorHandler');

const getCards = async (req, res, next) => {
  try {
    const cardsData = await Card.find({}).populate(['owner', 'likes']); // show the full info about the user in likes and owner
    if (cardsData) {
      res.status(200).send(cardsData);
    } else {
      throw new Error();
    }
  } catch (e) {
    next(e);
  }
};

const getCardsById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const card = await Card.findById(id);
    if (card) {
      res.status(200).send(card);
    } else if (card === null) {
      next(new NotFoundError('wrong id card is not found'));
    } else {
      throw new Error();
    }
  } catch (e) {
    if (e.name === 'CastError') {
      next(new BadRequestError('Bad request please check it!'));
      return;
    }

    next(e);
  }
};

const createCard = async (req, res, next) => {
  const { _id } = req.user;
  const { name, link } = req.body;
  try {
    const user = await User.findById({ _id });
    const card = await Card.create({ name, link, owner: user });
    if (card) {
      res.status(201).send(card);
    } else {
      throw new Error();
    }
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new BadRequestError('you are trying to send invalid data, please try again'));
      return;
    }

    next(e);
  }
};

const deleteCard = async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user

  try {
    const card = await Card.findById(id)

    console.log(_id);
    if (card.owner._id === _id) {
      const removeCard = await Card.findByIdAndDelete(id);
      if (removeCard) {
        res.status(200).json(removeCard)
      }
      else {
        throw new Error();
      }
    }
    else if (card === null) {
      next(new NotFoundError('cards does not excist'))
    }
    else {
      next(new ForbiddentError('you cant delete other users card'))
    }
  }

  catch (e) {
    if (e.name === 'CastError') {
      next(new BadRequestError('your info is invalid , please try again!'));
      return;
    }
    next(e);
  }
};
const likeCard = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const like = await Card.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: _id } },
      { new: true },
    ).populate(['likes', 'owner']);

    if (like) {
      res.status(200).send(like);
    } else if (like === null) {
      next(new NotFoundError('this card that is not excist'));
    } else {
      throw new Error();
    }
  } catch (e) {
    if (e.name === 'CastError') {
      next(new BadRequestError('data you are passing is invalid'));
      return;
    }

    next(e);
  }
};

const disLikeCard = async (req, res, next) => {
  const { _id } = req.user;

  try {
    const like = await Card.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: _id } },
      { new: true },
    ).populate(['likes', 'owner']);

    if (like) {
      res.status(200).send(like);
    } else if (like === null) {
      next(new NotFoundError('this card that is not excist'));
    } else {
      throw new Error();
    }
  } catch (e) {
    if (e.name === 'CastError') {
      next(new BadRequestError('Bad request , the data you are passing is invalid'));
      return;
    }

    next(e);
  }
};

module.exports = {
  getCards, getCardsById, createCard, deleteCard, likeCard, disLikeCard,
};
