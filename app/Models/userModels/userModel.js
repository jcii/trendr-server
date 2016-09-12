'use strict';
var db = require('../../config/db/knex/knexConfig');
var bcrypt = require('bcrypt');
module.exports = (function () {
    function userModel() {
    }
    userModel.prototype.getUsers = function () {
        return db.knex('users');
    };
    userModel.prototype.getUser = function (user) {
        return db.knex('users').where(user);
    };
    userModel.prototype.createUser = function (user) {
        return db.knex('users').insert({
            username: user.username,
            password: bcrypt.hashSync(user.password, 10)
        }).then(function () {
            db.knex.raw("select id from users where id = (select max(id) from users)").then(function (id) {
                db.knex.raw("insert into tweets_collected values (default, " + id.rows[0].id + ", 0)").then(function () {
                    console.log('instantiated tweets collected');
                });
            });
        });
    };
    userModel.prototype.createUserIfNotExists = function (user) {
        console.log(user);
        return db.knex('users').where('username', user.username)
            .then(function (userResponse) {
            if (userResponse.length == 0) {
                return db.knex('users').insert({
                    username: user.username,
                    password: bcrypt.hashSync(user.password, 10),
                    email: user.email
                });
            }
        });
    };
    userModel.prototype.checkUserLogin = function (user) {
        return db.knex('users').where(user);
    };
    userModel.prototype.checkUserToken = function (token) {
        return db.knex('users').where({ token: token });
    };
    return userModel;
}());
