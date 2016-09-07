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
    return TrendClass;
}());
