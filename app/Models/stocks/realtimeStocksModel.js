'use strict';
var db = require('../../config/db/knex/knexConfig');
var request = require('request');
module.exports = (function () {
    function realtimeStocks() {
    }
    realtimeStocks.prototype.getRealtimeStockPrice = function () {
        request("http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=NFLX", function (error, response, body) {
            return (!error && response.statusCode == 200) ? body : 'Not found';
        });
    };
    return realtimeStocks;
}());
