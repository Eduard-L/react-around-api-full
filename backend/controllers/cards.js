// handlers for sending data to the user // async opertaion

const Card = require('../models/card');

const { NotFoundError, BadRequestError } = require('../utils/errorHandler')

const VALIDATION_CODE = 400;
const DEFAULTERROR_CODE = 500;

const getCards = async (req, res, next) => {
  try {
    const cardsData = await Card.find({}).populate(['owner', 'likes']); // show the full info about the user in likes and owner
    if (cardsData) {
      res.status(200).send(cardsData);
    } else {
      // res.status(VALIDATION_CODE).send({ message: 'something went wrong with the cards data' });
      throw new Error();
    }
  } catch (e) {
    // res.status(DEFAULTERROR_CODE).send({ message: 'something went wrong with the server' });
    next(e)
  }
};

const getCardsById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const card = await Card.findById(id);
    if (card) {
      res.status(200).send(card);
    } else if (card === null) {
      // res.status(NOTFOUND_CODE).json({ message: 'wrong id card is not found' });
      next(new NotFoundError('wrong id card is not found'))
    } else {
      // res.status(VALIDATION_CODE).send({ message: 'something went wrong with find the card' });
      throw new Error()
    }
  } catch (e) {
    if (e.name === 'CastError') {
      // res.status(VALIDATION_CODE).json({ message: 'you have typed wrong id length' });
      next(new BadRequestError('Bad request please check it!'))
      return;
    }
    // res.status(DEFAULTERROR_CODE).send({ message: 'something went wrong with the server ' });
    next(e)
  }
};

const createCard = async (req, res, next) => {
  const { _id } = req.user;
  const { name, link } = req.body;
  try {
    const card = await Card.create({ name, link, owner: _id });
    if (card) {
      res.status(201).send(card);
    } else {
      // res.status(VALIDATION_CODE).json({ message: 'somtething went wrong with card creation' });
      throw new Error();
    }
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new BadRequestError('you are trying to send invalid data, please try again'))
      return;
    }
    // res.status(DEFAULTERROR_CODE).send({ message: 'something wrong with server' });
    next(e)
  }
};

const deleteCard = async (req, res, next) => {
  const { id } = req.params;


  try {
    const card = await Card.findByIdAndDelete(id);
    if (card) {
      res.status(200).json(card);
    } else if (card === null) {
      // res.status(NOTFOUND_CODE).json({ message: 'you are trying to delete card that not excist' });
      next(new NotFoundError('you are trying to delete card that not excist'))
    } else {
      // res.status(VALIDATION_CODE).send({ message: 'error while deleting card' });
      throw new Error()
    }
  } catch (e) {
    if (e.name === 'CastError') {
      // res.status(VALIDATION_CODE).json({ message: 'you are sending invalid id to the server' });
      next(new BadRequestError('your info is invalid , please try again!'))
      return;
    }
    next(e)
  }
};
const likeCard = async (req, res, next) => {
  try {
    const like = await Card.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: '6248a8973fec0ef6873f5927' } },
      { new: true },
    );

    if (like) {
      res.status(200).send(like);
    } else if (like === null) {
      // res.status(NOTFOUND_CODE).json({ message: 'you are trying to like card that is not excist' });
      next(new NotFoundError('you are trying to like card that is not excist'))
    } else {
      // res.status(VALIDATION_CODE).send({ message: 'something went wrong with your like ' });
      throw new Error();
    }
  } catch (e) {
    if (e.name === 'CastError') {
      // res.status(VALIDATION_CODE).send({ message: 'you pass invalid id for the like card' });
      next(new BadRequestError('Bad request , the data you are passing is invalid'))
      return;
    }
    // res.status(DEFAULTERROR_CODE).send({ message: `something went wrong with the backend ${e}` });

    next(e)
  }
};

const disLikeCard = async (req, res, next) => {
  try {
    const like = await Card.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: '6248a8973fec0ef6873f5927' } },
      { new: true },
    );

    if (like) {
      res.status(200).send(like);
    } else if (like === null) {
      // res.status(NOTFOUND_CODE).json({ message: 'you are trying to dislike card that is not excist' });
      next(new NotFoundError('you are trying to dislike card that is not excist'))
    } else {
      // res.status(VALIDATION_CODE).send({ message: 'something went wrong with the dislike ' });
      throw new Error()
    }
  } catch (e) {
    if (e.name === 'CastError') {
      // res.status(VALIDATION_CODE).send({ message: 'you pass invalid id for the dislike card' });
      next(new BadRequestError('Bad request , the data you are passing is invalid'));
      return;
    }
    // res.status(DEFAULTERROR_CODE).json({ message: `something went wrong ${e}` });
    next(e);
  }
};

module.exports = {
  getCards, getCardsById, createCard, deleteCard, likeCard, disLikeCard,
};
