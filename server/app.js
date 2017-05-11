var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const passport = require('passport');
const localStrategy = require('passport-local');
const cors = require('cors');

var index = require('./routes/index');
var users = require('./routes/users');
var foods = require('./routes/foods');

//connection to MongoDB
const mongoose = require('mongoose');
const db_config = {
  development: 'mongodb://localhost/eatlah',
  test: 'mongodb://localhost/eatlah-test'
}

var app = express();
const app_env = app.settings.env
console.log(app_env);
mongoose.connect(db_config[app_env],(err, res)=>{
  console.log(`Connected to Database ${db_config[app_env]}`);
});

app.use(cors())
app.use(passport.initialize());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/foods', foods)

module.exports = app;
