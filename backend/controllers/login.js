const { User, jwt, mySecret } = require('../utils/constants')

const { Unauthorized, BadRequestError } = require('../utils/errorHandler')

const login = async (req, res, next) => {

  const { password, email } = req.body

  try {
    if (!password || !email) {
      next(new BadRequestError('Bad request, please provide password and email'))
    }
    const user = await User.findUserByCredentials(email, password)
    console.log(user)
    if (user) {
      const { _id } = user._id
      console.log(_id)
      const token = await jwt.sign({ _id: user._id }, mySecret, { expiresIn: 3600 })

      res.status(200).json(token)
    }
    else {
      throw new Error()
    }

  }
  catch (e) {
    // if (e instanceof Unauthorized) {
    //   // res.status(e.status).json(e.message);
    //   return
    // }

    // res.status(DEFAULTERROR_CODE).send({ message: `something went wrong with the backend, ${e}` });
    next(e)
  }

}

module.exports = { login }