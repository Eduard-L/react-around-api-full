const { ForbiddentError } = require('../utils/errorHandler')
const { jwt, mySecret } = require('../utils/constants')
const auth = (req, res, next) => {

  const { authorization } = req.headers;
  try {
    if (!authorization || !authorization.startsWith('Brearer ')) {

      // throw new Unauthorized('Authorization required', UNAUTHORIZEDUSER_CODE)
      next(new ForbiddentError('Authorization required'))
      return

    }

    const token = authorization.replace('Bearer ', '');

    const payload = jwt.verify(token, mySecret);
    if (payload) {
      req.user = payload;
    }
    else {
      // throw new Unauthorized('Authorization required', UNAUTHORIZEDUSER_CODE)
      next(new ForbiddentError('Authorization required'))
      return
    }




  }
  catch (e) {

    // if (e instanceof Unauthorized) {
    //   res.status(e.status).send({ message: `${e.message}` })
    //   return
    // }
    // res.status(DEFAULTERROR_CODE).send({ message: `something went wrong with the backend, ${e}` });
    next(e)

  }


  next();
}

module.exports = { auth }