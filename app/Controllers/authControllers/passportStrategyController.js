// 'use strict'
// const passport = require('passport')
// const bcrypt = require('bcrypt')
// const LocalStrategy = require('passport-local').Strategy;
// const BearerStrategy = require('passport-http-bearer').Strategy;
// const userModelClass = require('../../Models/authModels/userModel')
// const userModel = new userModelClass

// module.exports = (passport) => {
//   passport.use(
//   new LocalStrategy({
//       usernameField: 'username',
//       passwordField: 'password',
//       session: true },
//     (username, password, done) => {
//         process.nextTick(() => {
//           userModel.checkUserLogin({username})
//             .catch((e) => done(null, false))
//             .then((collection) => {
//             if(collection.length > 0){
//               if(bcrypt.compareSync(password, collection[0].password)){
//                 return done(null, collection[0])
//               } else {
//                 return done(null, false)
//               }
//             } else {
//               return done(null, false)
//             }
//         })
//       })
//     }
//   )
// )
// passport.use(new BearerStrategy(
//   (token, done) => {
//     userModel.checkUserToken(token).then((user) => {
//       if(user.length == 0){
//         return done(null, false)
//       } else {
//         return done(null, user, { scope: 'all' });
//       }
//     })
//   }
// ))

// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });
// }