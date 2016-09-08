'use strict'
/// <reference path="./typings/tsd.d.ts"/>
process.stderr.on('data', function(data) {
  console.log(data);
});

import { Request, Response } from "express"

const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const bodyParser = require('body-parser')
const jsonAPI = require('./routes/routeExporter')
const passport = require('passport')
const session = require('express-session')
require('dotenv').config()
const app = express()
// CORS headers
app.use((req: Request, res: Response, next: Function) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    next()
})
app.use(passport.initialize());
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '/public')))

for(let route in jsonAPI){
  if(jsonAPI.hasOwnProperty(route)){
    app.use(route.toString(), jsonAPI[route])
  }
}

app.use('/cole', require('./routes/API/coleRoute'))
app.use('/realtimeStocks', require('./routes/API/realtimeStocks'))
app.use('/stockHistory', require('./routes/API/stockHistory'));
app.use('/stockSymbol', require('./routes/API/stockSymbolRoute'));
app.use('/twitterSearch', require('./routes/API/twitterSearchRoute'));
app.use('/twitterStream', require('./routes/API/twitterStreamRoute'));
app.use('/trend', require('./routes/API/trendRoute'));
app.use('/user', require('./routes/API/userRoute'));
app.use('/nm', express.static(__dirname + '/../node_modules/'))
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'secret'
}))
// require('./Controllers/authControllers/passportStrategyController.js')(passport)
app.use((req: Request, res :Response, next: Function) => {
  var err = new Error('Not Found')
  next(err)

})
app.use((err: Error, req: Request, res: Response, next: Function) => {
  res.json({ message: err.message })
})
module.exports = app