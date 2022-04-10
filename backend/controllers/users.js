const { User, ADMIN_ID } = require('../utils/constants');
const { NotFoundError, BadRequestError, ForbiddentError } = require('../utils/errorHandler');

const getUsersData = async (req, res, next) => {
  const { _id } = req.user;
  try {
    // if (_id !== ADMIN_ID) {
    //   next(new ForbiddentError('you are not an admin you cant see others users data '));
    // }
    const users = await User.find({});
    if (users) {
      res.status(200).send(_id);
    } else {
      throw new Error();
    }
  } catch (e) {
    next(e);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      res.status(200).send(user);
    } else if (user === null) {
      next(new NotFoundError('User has not found !'));
    }
  } catch (e) {
    if (e.name === 'CastError') {
      next(new BadRequestError('Bad request please check it!'));
      return;
    }
    next(e);
  }
};

const getUserInfo = async (req, res, next) => { // done
  const { _id } = req.user;
  try {
    const user = await User.findOne({ _id });
    if (user) {
      res.status(200).send(user);
    } else if (user === null) {
      next(new NotFoundError('the user has not founded'));
    }
  } catch (e) {
    if (e.name === 'CastError') {
      next(new BadRequestError('you have provided invalid info '));
      return;
    }
    next(e);
  }
};

const updateUserInfo = async (req, res, next) => { // done
  const { _id } = req.user;
  const { name, about } = req.body;

  try {
    const updateInfo = await User.findByIdAndUpdate(
      _id,
      { name, about },
      { runValidators: true, new: true },

    );
    if (updateInfo && (name || about)) {
      res.status(200).send(updateInfo);
    } else if (updateInfo === null) {
      next(new NotFoundError('you are tryin to update user that does not excist'));
    } else {
      throw new Error();
    }
  } catch (e) {
    if (e.name === 'CastError') {
      next(new BadRequestError('you passing invalid user id, please try again'));
      return;
    }
    if (e.name === 'ValidationError') {
      next(new BadRequestError('you passing invalid user id, please try again'));
      return;
    }
    next(e);
  }
};

const updateUserAvatar = async (req, res, next) => { // done
  const { _id } = req.user;
  const { avatar } = req.body;

  try {
    const updatedInfo = await User.findByIdAndUpdate(_id, { avatar }, { runValidators: true });
    if (updatedInfo && avatar) {
      res.status(200).send({ message: 'the user avatar updated successfully' });
    } else if (updatedInfo !== null) {
      next(new NotFoundError('the user that you are trying to update is no longer excist'));
    } else {
      throw new Error();
    }
  } catch (e) {
    if (e.name === 'CastError') {
      next(new BadRequestError('your info is invalid , please try again!'));
      return;
    }
    if (e.name === 'ValidationError') {
      next(new BadRequestError('your info is invalid , please try again!'));
      return;
    }

    next(e);
  }
};

const deleteUser = async (req, res, next) => {
  const { _id } = req.user;
  const { id } = req.params;
  try {
    if (_id !== ADMIN_ID) {
      next(new ForbiddentError('you are not an admin you cant delete other users '));
    }
    const deletingUser = await User.findByIdAndDelete(id);

    if (deletingUser) {
      res.status(200).json(deletingUser);
    } else if (deletingUser === null) {
      next(new NotFoundError('you are trying to delete user that not excist'));
    } else {
      throw new Error();
    }
  } catch (e) {
    if (e.name === 'CastError') {
      next(new BadRequestError('your info is invalid , please try again!'));
      return;
    }

    next(e);
  }
};

module.exports = {
  deleteUser, getUsersData, getUserById, updateUserAvatar, updateUserInfo, getUserInfo,
};
