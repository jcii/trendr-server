'use strict'
const db = require('../../config/db/knex/knexConfig')
const bcrypt = require('bcrypt')
module.exports =  class userModel {
  constructor() {}
  getUsers() {
    return db.knex('users')
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
