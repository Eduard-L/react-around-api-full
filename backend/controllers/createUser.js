const { bcrypt, User, SALT } = require('../utils/constants')
const { BadRequestError, ConflictError } = require('../utils/errorHandler')

const createUser = async (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  try {
    const isEmailFree = await User.findOne({ email })
    if (isEmailFree) {
      next(new ConflictError('this user is already excist'))
      return
    }
    const userPassword = await bcrypt.hash(password, SALT)
    if (userPassword) {
      const newUser = await User.create({ name, about, avatar, email, password: userPassword });
      if (newUser) {
        res.status(201).send(newUser);
      } else {
        // res.status(VALIDATION_CODE).json({ message: 'something went wrong with user creation' });
        throw new Error()
      }

    } else {
      // res.status(VALIDATION_CODE).json({ message: 'you password is invalid please try again' })
      throw new Error()
    }


  } catch (e) {
    if (e.name === 'ValidationError') {
      // res.status(VALIDATION_CODE).json({ message: 'you have sent a invalid info to the server' });
      next(new BadRequestError('you have sent a invalid info to the server'))
      return;
    }
    // res.status(DEFAULTERROR_CODE).json({ message: 'something went wrong with user creation' });
    next(e)
  }
};

module.exports = { createUser }