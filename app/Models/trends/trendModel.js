'use strict';
var trendDb = require('../../config/db/knex/knexConfig');
var trendService = require('./services/trendServices');
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
                    var symbolArr = trendService.createSymbolArr(obj.trend_symbols, id.rows[0].id);
                    Promise.all(symbolArr).then(function () {
                        var keywordArr = trendService.createKeywordArr(obj.trend_keywords, id.rows[0].id);
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
