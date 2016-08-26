'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var jsonAPI = require('./routes/routeExporter');
var passport = require('passport');
var session = require('express-session');
require('dotenv').config();
var app = express();
// CORS headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(passport.initialize());
app.use(passport.session());
app.set('views', path.join(__dirname, 'views'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));
// for(let route in jsonAPI){
//   if(jsonAPI.hasOwnProperty(route)){
//     let routeString = '/' +   route.toString()
//     app.use(routeString, jsonAPI[route])
//   }
// }
app.use('/cole', require('./routes/API/coleRoute'));
app.use('/nm', express.static(__dirname + '/../node_modules/'));
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'secret'
}));
// require('./Controllers/authControllers/passportStrategyController.js')(passport)
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    next(err);
});
app.use(function (err, req, res, next) {
    res.json({ message: err.message });
});
module.exports = app;
