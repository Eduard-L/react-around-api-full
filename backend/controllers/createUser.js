const { bcrypt, User, SALT } = require('../utils/constants');
const { BadRequestError, ConflictError } = require('../utils/errorHandler');

const createUser = async (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  try {
    const isEmailFree = await User.findOne({ email });
    if (isEmailFree) {
      next(new ConflictError('this user is already excist'));
      return;
    }
    const userPassword = await bcrypt.hash(password, SALT);
    if (userPassword) {
      const newUser = await User.create({
        name, about, avatar, email, password: userPassword,
      });
      if (newUser) {
        const { _id } = newUser;
        res.status(201).send({
          _id, name: newUser.name, about: newUser.about, avatar: newUser.avatar, email,
        });
      } else {
        throw new Error();
      }
    } else {
      throw new Error();
    }
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new BadRequestError('your data is invalid'));
      return;
    }

    next(e);
  }
};

module.exports = { createUser };
