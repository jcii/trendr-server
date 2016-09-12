'use strict';
var userDb = require('../../config/db/knex/knexConfig');
module.exports = (function () {
    function TrendClass() {
    }
    TrendClass.prototype.getStats = function (username) {
        console.log(username);
        return new Promise(function (resolve, reject) {
            userDb.knex.raw("select id from users where username = '" + username + "'").then(function (id) {
                console.log(typeof id.rows[0].id);
                userDb.knex.raw("select tweets_collected from tweets_collected where user_id = " + id.rows[0].id).then(function (totalTweets) {
                    userDb.knex.raw("select stock_prices_collected from stock_prices_collected where user_id = " + id.rows[0].id).then(function (stockPrices) {
                        userDb.knex.raw("select count(*) from trends where user_id = " + id.rows[0].id).then(function (trends) {
                            resolve({
                                tweets: totalTweets.rows[0].tweets_collected,
                                stockPrices: stockPrices.rows[0].stock_prices_collected,
                                trends: trends.rows[0].count
                            });
                        });
                    });
                });
            });
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
