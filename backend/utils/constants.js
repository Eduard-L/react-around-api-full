const bcrypt = require('bcryptjs');
const DEFAULTERROR_CODE = 500;
const NOTFOUND_CODE = 404;
const VALIDATION_CODE = 400;
const UNAUTHORIZED_CODE = 401;
const UNAUTHORIZEDUSER_CODE = 403;


const SALT = 10;
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const mySecret = 'askhdskhs/3232%#%#Kdsj2#433LSKJLSJL#!#@#%^^*^*akshdkjshdjshshd@D#V%^^B&B*&&N&%$%#C$CVVBHGVE#$#$$#43639435;aaldkscm,xcndhds.,usgwugegfxfkjbgfugbuywg23245656'

module.exports = { bcrypt, User, VALIDATION_CODE, DEFAULTERROR_CODE, SALT, jwt, mySecret, NOTFOUND_CODE, UNAUTHORIZED_CODE, UNAUTHORIZEDUSER_CODE }