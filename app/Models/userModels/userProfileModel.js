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
    return TrendClass;
}());
