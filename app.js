/*"source app-env && node ./bin/www" was the npm start*/
require('dotenv').config();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
let passport = require('passport');

mongoose.connect(process.env.DATABASE/*, {
  useMongoClient: true
}*/);

require('./models/Hiscore.model');
require('./models/User');
// require('./models/Gebruiker.model');

require('./config/passport');

var index = require('./routes/index');
var users = require('./routes/users');
var hiscores = require('./routes/hiscores');

var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

 app.use(express.static(__dirname + '/dist'));
                    
                    app.all('*', (req, res) => {
                      const indexFile = `${path.join(__dirname, 'dist')}/index.html`;
                      res.status(200).sendFile(indexFile);
                    }); 

app.use('/', index);
app.use('/API/users', users);
app.use('/API/hiscores', hiscores);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err.message);
});

module.exports = app;