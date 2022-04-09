const { Unauthorized } = require('../utils/errorHandler')
const { jwt, JWT_SECRET } = require('../utils/constants')
const auth = (req, res, next) => {

  // const Authorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjRlOGI4N2JmMmU3ZDM1YWNmMGQ4NjciLCJpYXQiOjE2NDkzMTkyNjgsImV4cCI6MTY0OTMyMjg2OH0.obJSjEzAFPVQUh_NAi9gtU23Hi_Pur8c01L0-g9VffQ"
  const { authorization } = req.headers


  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {

      // throw new Unauthorized('Authorization required', UNAUTHORIZEDUSER_CODE)
      next(new Unauthorized('Authorization required'))
      return

    }

    const token = authorization.replace('Bearer ', '');

    const payload = jwt.verify(token, JWT_SECRET);
    if (payload) {
      req.user = payload;


    }
    else {
      // throw new Unauthorized('Authorization required', UNAUTHORIZEDUSER_CODE)
      next(new Unauthorized('Authorization required'))
      return
    }




  }
  catch (e) {


    next(e)

  }


  next();
}

module.exports = { auth }