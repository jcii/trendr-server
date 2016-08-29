'use strict'
import {Request, Response} from "express"
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
app.use(passport.session());
app.set('views', path.join(__dirname, 'views'));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '/public')))

// for(let route in jsonAPI){
//   if(jsonAPI.hasOwnProperty(route)){
//     let routeString = '/' +   route.toString()
//     app.use(routeString, jsonAPI[route])
//   }
// }

app.use('/cole', require('./routes/API/coleRoute'))
app.use('/realtimeStocks', require('./routes/API/realtimeStocks'))
app.use('/stockHistory', require('./routes/API/stockHistory'));
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