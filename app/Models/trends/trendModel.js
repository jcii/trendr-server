'use strict';
var trendDb = require('../../config/db/knex/knexConfig');
var trendService = require('./services/trendServices');
// bookshelf definitions
var User = trendDb.bookshelf.Model.extend({
    tableName: 'users',
    trends: function () {
        return this.hasMany(Trend);
    }
});
var Trend = trendDb.bookshelf.Model.extend({
    tableName: 'trends',
    symbols: function () {
        return this.hasMany(Symbol);
    },
    keywords: function () {
        return this.hasMany(Keyword);
    }
});
var Symbol = trendDb.bookshelf.Model.extend({
    tableName: 'trend_tickers',
    trends: function () {
        return this.belongsToMany(Trend);
    }
});
var Keyword = trendDb.bookshelf.Model.extend({
    tableName: 'twitter_keywords',
    trends: function () {
        return this.belongsToMany(Trend);
    }
});
module.exports = (function () {
    function TrendClass() {
    }
    TrendClass.prototype.sayHello = function () {
        return new Promise(function (resolve, reject) {
            resolve('hello from trend model');
        });
    };
    TrendClass.prototype.getTrendsForUser = function (id) {
        return User.forge({ id: id }).fetch({ withRelated: ['trends.symbols', 'trends.keywords'] });
    };
    TrendClass.prototype.getTrendById = function (id) {
        return trendDb.knex('trends').where({ id: id }).first();
    };
    TrendClass.prototype.createTrend = function (obj) {
        return new Promise(function (resolve, reject) {
            return trendDb.knex.raw("insert into trends values (default, 1, '" + obj.trend_title + "', false, '" + obj.trend_description + "')").then(function (data) {
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
    TrendClass.prototype.getStockHistories = function (user_id) {
        return new Promise(function (resolve, reject) {
            return trendDb.knex('trends').where('user_id', user_id).pluck('id').then(function (trend_ids) {
                return trendDb.knex('trend_tickers').whereIn('trend_id', trend_ids).select('trend_id', 'ticker').then(function (tickers) {
                    var tickerArr = trendService.createTickerArr(tickers);
                    Promise.all(tickerArr).then(function (trendStocks) {
                        resolve(trendStocks);
                    });
                });
            });
        });
    };
    return TrendClass;
}());
