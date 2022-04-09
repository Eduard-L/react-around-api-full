const express = require('express');

const mongoose = require('mongoose');

const helmet = require('helmet');

const bodyParser = require('body-parser');

const mainRouter = require('./routes/index');

const rateLimit = require('express-rate-limit');

const { handleErrors } = require('./middelwares/handleErrors')

const { requestLogger, errorLogger } = require('./middelwares/logger')

const { errors } = require('celebrate');

const cors = require("cors");
const { NODE_ENV } = require('./utils/constants');

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(limiter)

app.use(bodyParser.json());

app.use(helmet());

app.disable('x-powered-by');

const { PORT = 3000 } = process.env;


app.use(cors());
app.options('*', cors());

app.use(requestLogger);

app.use('/', mainRouter);

app.use(errorLogger);

app.use(handleErrors)

mainRouter.use(errors())

if (NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`everything works at port ${PORT}`);
  });
}


