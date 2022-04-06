const myVal = require('validator');

const validateURL = (value, helpers) => {
  if (myVal.isURL(value, { require_protocol: true, allow_underscores: true })) {
    return value;
  }
  return helpers.error('string.uri');
}
module.exports = { validateURL }
//validation value for the link property
