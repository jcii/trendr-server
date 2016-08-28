'use strict';
var db = require('../../config/db/knex/knexConfig');
var request = require('request');
module.exports = (function () {
    function realtimeStocks() {
    }
    //   getRealtimeStockPrice() {
    //     request(`http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=NFLX`, (error, response, body) => {
    //         return (!error && response.statusCode == 200) ? JSON.stringify(body) : 'Not found' 
    //     })
    //   }
    realtimeStocks.prototype.updateDatabase = function (obj) {
        return db.knex.raw("insert into realtime_stocks values (default, '" + obj.name + "', '" + obj.symbol + "', " + obj.price + ", " + obj.volume + ", '" + obj.timestamp + "')");
    };
    realtimeStocks.prototype.getDatabaseResults = function () {
        return db.knex.raw("select * from realtime_stocks");
    };
    return realtimeStocks;
}());
