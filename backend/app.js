const express = require('express');

const mongoose = require('mongoose');

const helmet = require('helmet');

const bodyParser = require('body-parser');

const { errors } = require('celebrate');
const cors = require('cors');
const mainRouter = require('./routes/index');

const { limiter } = require('./helpers/limiter');

const { handleErrors } = require('./middelwares/handleErrors');

const { requestLogger, errorLogger } = require('./middelwares/logger');

const { NODE_ENV } = require('./utils/constants');

const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(limiter);

app.use(bodyParser.json());

app.use(helmet());

app.disable('x-powered-by');

const { PORT = 3000 } = process.env;

app.use(cors());
app.options('*', cors());

app.use(requestLogger);

app.use('/', mainRouter);

app.use(errorLogger);

app.use(handleErrors);

mainRouter.use(errors());

if (NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`everything works at port ${PORT}`);
  });
}
