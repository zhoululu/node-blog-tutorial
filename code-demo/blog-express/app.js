var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const session = require('express-session')
const RedisStore = require("connect-redis")(session)
var logger = require('morgan');
const fs = require('fs')


const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

var app = express();

const fullPath = path.resolve(__dirname, './logs/access.log')

const writeStream = fs.createWriteStream(fullPath)

app.use(logger('combined', {
  stream: writeStream
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const redisClient  = require('./db/redis')
const sessionStore = new RedisStore({ client: redisClient })
app.use(session({
  secret: 'ZLL144280zll,./',
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  resave: false,
  saveUninitialized: false,
  store: sessionStore
}))

app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
