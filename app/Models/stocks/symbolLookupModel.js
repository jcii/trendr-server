'use strict';
var symbolDb = require('../../config/db/knex/knexConfig');
module.exports = (function () {
    function SymbolLookupClass() {
    }
    SymbolLookupClass.prototype.getCompany = function (searchString) {
        return symbolDb.knex.raw("select * from \n            (\n            select *\n            from amex_companies\n            union\n            select *\n            from nyse_companies\n            union\n            select *\n            from nasdaq_companies\n            ) companies\n            where LOWER(company_name) like LOWER('%" + searchString + "%')\n            or LOWER(symbol) like LOWER('%" + searchString + "%')");
    };
    return SymbolLookupClass;
}());
