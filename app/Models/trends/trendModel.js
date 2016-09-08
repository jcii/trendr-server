'use strict';
var trendDb = require('../../config/db/knex/knexConfig');
module.exports = (function () {
    function TrendClass() {
    }
    TrendClass.prototype.sayHello = function () {
        return new Promise(function (resolve, reject) {
            resolve('hello from trend model');
        });
    };
    TrendClass.prototype.createTrend = function (obj) {
        return new Promise(function (resolve, reject) {
            return trendDb.knex.raw("insert into trends values (default, 1, '" + obj.trend_title + "', 'hello there')").then(function (data) {
                return trendDb.knex.raw("select id from trends where id = (select max(id) from trends)").then(function (id) {
                    var symbolArr = [];
                    obj.trend_symbols.forEach(function (elem) {
                        symbolArr.push(trendDb.knex.raw("insert into trend_tickers values (default, 1, " + id.rows[0].id + ", '" + elem + "')"));
                    });
                    Promise.all(symbolArr).then(function () {
                        var keywordArr = [];
                        console.log(id.rows[0].id);
                        obj.trend_keywords.forEach(function (elem) {
                            keywordArr.push(trendDb.knex.raw("insert into twitter_keywords values (default, " + id.rows[0].id + ", '" + elem + "')"));
                        });
                        Promise.all(keywordArr).then(function () {
                            resolve('success');
                        });
                    });
                });
            }).catch(function (error) { return console.log(error); });
        });
    };
    return TrendClass;
}());
