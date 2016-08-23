// 'use strict'

// const db = require('../../config/db/knex/knexConfig')
// const bcrypt = require('bcrypt')
// const randToken = require('rand-token')
// module.exports = class userModel {
//   constructor() {}
//   getUser() {
//     return db.knex('feedz_users')
//   }
//   createUserIfNotExists(user) {
//     console.log(user)
//      return db.knex('feedz_users').where('username', user.username)
//       .then((userResponse) => {
//         if(userResponse.length == 0){
//           return db.knex('feedz_users').insert({
//             username: user.username, 
//             password: bcrypt.hashSync(user.password, 10), 
//             email:user.email,
//             token: randToken.generate(16)
//           })
//         }
//       })
//   }
//   checkUserLogin(user) {
//     return db.knex('feedz_users').where(user)
//   }
//   checkUserToken(token) {
//     return db.knex('feedz_users').where({token})
//   }
// }