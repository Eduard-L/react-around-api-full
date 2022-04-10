const { NotFoundError } = require('../utils/errorHandler');

const handleNonExcistPage = (req, res, next) => {
  next(new NotFoundError('Requested resource not found, please try again !'));
};

module.exports = { handleNonExcistPage };
