
const { User } = require('../utils/constants')
const { NotFoundError, BadRequestError, ForbiddentError } = require('../utils/errorHandler')


const getUsersData = async (req, res, next) => {
  const { _id } = req.params
  try {
    if (_id !== '62506c7e6363088ec820099e') {
      next(new ForbiddentError("you are not an admin you cant see others users data "))
    }
    const users = await User.find({});
    if (users) {
      res.status(200).send(users);
    }
    else {
      throw new Error()
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
      next(new NotFoundError('User has not found !'))

    }
  }
  catch (e) {
    if (e.name === 'CastError') {
      next(new BadRequestError('Bad request please check it!'))
      return
    }
    next(e);
  }
};

const getUserInfo = async (req, res, next) => {//done
  const { _id } = req.user
  try {
    const user = await User.findOne({ _id })
    if (user) {
      res.status(200).send(user)
    }
    else if (user === null) {
      next(new NotFoundError('the user has not founded'))
    }
  }
  catch (e) {
    if (e.name === 'CastError') {
      next(new BadRequestError("you have provided invalid info "))
      return
    }
    next(e)
  }
}



const updateUserInfo = async (req, res, next) => {//done
  const { _id } = req.user;
  const { name, about } = req.body;
  console.log(_id)
  try {
    const updateInfo = await User.findByIdAndUpdate(
      _id,
      { name, about },
      { runValidators: true, new: true },

    );
    if (updateInfo && (name || about)) {
      res.status(200).send(updateInfo);
    }
    else if (updateInfo === null) {
      next(new NotFoundError('you are tryin to update user that does not excist'))
    }
    else {
      // res.status(VALIDATION_CODE).send({ message: 'something went wrong with the update' });
      throw new Error();
    }
  } catch (e) {
    if (e.name === 'CastError') {
      // res.status(VALIDATION_CODE).json({ message: 'you passing invalid user id, please try again' });
      next(new BadRequestError('you passing invalid user id, please try again'))
      return;
    }
    if (e.name === 'ValidationError') {
      // res.status(VALIDATION_CODE).send({ message: 'your info is invalid , please try again!' });
      next(new BadRequestError('you passing invalid user id, please try again'))
      return;
    }
    next(e)
  }
};

const updateUserAvatar = async (req, res, next) => {//done
  const { _id } = req.user;
  const { avatar } = req.body;

  try {
    const updateInfo = await User.findByIdAndUpdate(_id, { avatar }, { runValidators: true });
    if (updateInfo && avatar) {
      res.status(200).send({ message: 'the user avatar updated successfully' });
    } else if (userId !== null) {
      // res.status(NOTFOUND_CODE).json({ message: 'the user that you are trying to update is no longer excist' });
      next(new NotFoundError('the user that you are trying to update is no longer excist'))
    } else {
      // res.status(VALIDATION_CODE).send({ message: 'something went wrong with the update avatar' });
      throw new Error();
    }
  } catch (e) {
    if (e.name === 'CastError') {
      next(new BadRequestError('your info is invalid , please try again!'))
      return;
    }
    if (e.name === 'ValidationError') {
      // res.status(VALIDATION_CODE).send({ message: 'your info is invalid , please try again!' });
      next(new BadRequestError('your info is invalid , please try again!'))
      return;
    }
    // res.status(DEFAULTERROR_CODE).send({ message: `something went wrong with the backend, ${e}` });
    next(e)
  }
};

const deleteUser = async (req, res, next) => {
  const { _id } = req.params;


  try {
    if (_id !== '62506c7e6363088ec820099e') {
      next(new ForbiddentError("you are not an admin you cant delete other users "))
    }
    const deletingUser = await User.findByIdAndDelete(id);

    if (deletingUser) {
      res.status(200).json(deletingUser);
    } else if (deletingUser === null) {
      // res.status(NOTFOUND_CODE).json({ message: 'you are trying to delete user that not excist' });
      next(new NotFoundError('you are trying to delete user that not excist'))
    } else {
      // res.status(VALIDATION_CODE).send({ message: 'error while deleting user' });
      throw new Error()
    }
  } catch (e) {
    if (e.name === 'CastError') {
      // res.status(VALIDATION_CODE).json({ message: 'you are sending invalid id to the server' });
      next(new BadRequestError('your info is invalid , please try again!'))
      return;
    }
    // res.status(DEFAULTERROR_CODE).send({ message: 'server error' });
    next(e)
  }
};




module.exports = {
  deleteUser, getUsersData, getUserById, updateUserAvatar, updateUserInfo, getUserInfo
};
