require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/limiter');
const { handleErrors } = require('./middlewares/handleErrors');
const { handleNotFoundPage } = require('./middlewares/handleNotFoundPage');
const { handleCorsOrigin } = require('./middlewares/handleCorsOrigin');
const { handleCorsPreflight } = require('./middlewares/handleCorsPreflight');

const index = require('./routes/index');

mongoose.connect(process.env.DB_URL);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(limiter);
app.use(handleCorsOrigin);
app.use(handleCorsPreflight);
app.use(requestLogger);
app.use('/', index);
app.use(errorLogger);
app.use(errors());
app.use(handleErrors);
app.use('*', handleNotFoundPage);

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
