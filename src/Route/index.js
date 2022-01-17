const express = require('express');
const authRouter = require('./auth.route');
const movieRouter = require('./movie.route');

const app = express();

app.use('/auth', authRouter);
app.use('/movie', movieRouter);

module.exports = app;