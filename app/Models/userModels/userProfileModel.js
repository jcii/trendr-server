'use strict';
var userDb = require('../../config/db/knex/knexConfig');
module.exports = (function () {
    function TrendClass() {
    }
    TrendClass.prototype.sayHello = function () {
        return new Promise(function (resolve, reject) {
            resolve('hello from user profile model');
        });
    };
    TrendClass.prototype.getUserId = function (username, trend_id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return userDb.knex('users').where('username', username).pluck('id').then(function (user_id) {
                _this.getTickerSymbol(trend_id, user_id).then(function (ticker) { return resolve({ user_id: user_id[0], ticker: ticker }); });
            });
        });
    };
    TrendClass.prototype.getTickerSymbol = function (trend_id, user_id) {
        return new Promise(function (resolve, reject) {
            return userDb.knex('trend_tickers').where({ user_id: Number(user_id), trend_id: Number(trend_id) }).pluck('ticker').then(function (ticker) { return resolve(ticker[0]); });
        });
    };
    TrendClass.prototype.getActiveKeyword = function (trend_id) {
    };
    return TrendClass;
}());
