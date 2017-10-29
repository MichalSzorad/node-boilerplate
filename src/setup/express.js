import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import index from '../routes/index';

const PROJECT_PATH = path.join(__dirname, '..');

const notFoundHandler = (req, res, next) => next(Object.assign(new Error("Not found"), {
  status: 404
}));

const errorViewHandler = (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
}

export default (app) => {

  // view engine setup
  app.set('views', path.join(PROJECT_PATH, 'views'));
  app.set('view engine', 'hbs');

  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(PROJECT_PATH, 'public', 'favicon.ico')));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(PROJECT_PATH, 'public')));

  app.use('/', index);

  // catch 404 and forward to error handler
  app.use(notFoundHandler);

  // error handler
  app.use(errorViewHandler);
}
