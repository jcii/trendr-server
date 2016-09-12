var trendServicesDb = require('../../../config/db/knex/knexConfig');
module.exports = {
    createSymbolArr: function (arr, id) {
        var symbolArr = [];
        arr.forEach(function (elem) {
            symbolArr.push(trendServicesDb.knex.raw("insert into trend_tickers values (default, 1, " + id + ", '" + elem + "')"));
        });
        return symbolArr;
    },
    createKeywordArr: function (arr, id) {
        var keywordArr = [];
        arr.forEach(function (elem) {
            console.log("now logging elem");
            console.log(elem);
            keywordArr.push(trendServicesDb.knex.raw("insert into twitter_keywords values (default, " + id + ", '" + elem.keyword + "', " + elem.is_active + ")"));
        });
        return keywordArr;
    }
};
