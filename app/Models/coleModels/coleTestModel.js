'use strict';
var coleDb = require('../../config/db/knex/knexConfig');
module.exports = (function () {
    function coleTestModel() {
    }
    coleTestModel.prototype.getTrends = function () {
        return coleDb.knex.raw("select * from trends");
    };
    return coleTestModel;
}());
