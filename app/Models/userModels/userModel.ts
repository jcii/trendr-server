'use strict'
const db = require('../../config/db/knex/knexConfig')
const bcrypt = require('bcrypt')
module.exports =  class userModel {
  constructor() {}
  getUsers() {
    return db.knex('users')
  }
  getUser(user) {
    return db.knex('users').where(user)
  }
  createUser(user) {
    return db.knex('users').insert({
      username: user.username, 
      password: bcrypt.hashSync(user.password, 10), 
    }).then(() => {
        db.knex.raw(`select id from users where id = (select max(id) from users)`).then(id => {
          db.knex.raw(`insert into tweets_collected values (default, ${id.rows[0].id}, 0)`).then(() => {
            db.knex.raw(`insert into stock_prices_collected values (default, ${id.rows[0].id}, 0)`).then(() => {
            console.log('instantiated tweets and stocks collected')
            })
          })
        })
      })
  }
  createUserIfNotExists(user) {
    console.log(user)
     return db.knex('users').where('username', user.username)
      .then((userResponse) => {
        if(userResponse.length == 0){
          return db.knex('users').insert({
            username: user.username, 
            password: bcrypt.hashSync(user.password, 10), 
            email:user.email
          })
        }
      })
  }
  checkUserLogin(user) {
    return db.knex('users').where(user)
  }
  checkUserToken(token) {
    return db.knex('users').where({token})
  }
} 
