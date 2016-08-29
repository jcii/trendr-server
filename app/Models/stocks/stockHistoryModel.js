'use strict';
var db = require('../../config/db/knex/knexConfig');
var request = require('request');
module.exports = (function () {
    function StockHistoryClass() {
    }
    StockHistoryClass.prototype.getStockHistory = function (obj) {
        var url = "http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters={\"Normalized\":false,\"NumberOfDays\":" + obj.NumberOfDays + ",\"DataPeriod\":\"" + obj.DataPeriod + "\",\"Elements\":[{\"Symbol\":\"" + obj.Symbol + "\",\"Type\":\"price\",\"Params\":[\"c\"]}]}";
        return new Promise(function (resolve, reject) {
            request(url, function (error, response, body) {
                return (!error && response.statusCode == 200) ? resolve(body) : reject(error);
            });
        });
    };
    return StockHistoryClass;
}());
