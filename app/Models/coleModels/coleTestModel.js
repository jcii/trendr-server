'use strict';
var db = require('../../config/db/knex/knexConfig');
module.exports = (function () {
    function coleTestModel() {
    }
    coleTestModel.prototype.getTrends = function () {
        return db.knex.raw("select * from trends");
    };
    return coleTestModel;
}());
