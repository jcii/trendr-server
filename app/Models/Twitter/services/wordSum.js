var wordSumDb = require('../../../config/db/knex/knexConfig');
module.exports = {
    sortObj: function (obj, trend_id) {
        var arr = [];
        var dataPoints = [];
        var axisLabels = [];
        for (var key in obj) {
            arr.push([key, obj[key]]);
        }
        var finalCount = arr.sort(function (a, b) { return a[1] - b[1]; }).reverse().slice(0, 5).reduce(function (obj, elem) {
            obj[elem[0]] = elem[1];
            return obj;
        }, {});
        var total = 0;
        for (var key in finalCount) {
            axisLabels.push(key);
            dataPoints.push(finalCount[key]);
            total += finalCount[key];
        }
        return {
            axisLabels: axisLabels,
            dataPoints: dataPoints,
            total: total
        };
    },
    createDatabaseArray: function (arr) {
        var databaseArray = [];
        arr.forEach(function (tweet) {
            var unix = new Date(tweet.created_at).getTime();
            var fullDate = new Date(tweet.created_at).toDateString();
            var hashtags = '';
            tweet.entities.hashtags.forEach(function (elem) { return hashtags += elem.text + " "; });
            var text = tweet.text.replace(/[^a-zA-Z0-9\s]/g, '');
            databaseArray.push(wordSumDb.knex.raw("insert into current_keyword_mentions values (default, 1, '" + text + "', '" + hashtags + "', " + unix + ", '" + fullDate + "')"));
        });
        return databaseArray;
    },
    createWordArray: function (finalData) {
        var wordArray = [];
        finalData.rows.forEach(function (elem) {
            elem.text.split(' ').forEach(function (word) { return wordArray.push(word); });
        });
        return wordArray;
    },
    createFinalCount: function (wordArray, keyword) {
        return wordArray.reduce(function (obj, elem) {
            if (elem.length >= 5 && !elem.toLowerCase().includes(keyword)) {
                obj[elem.toLowerCase()] = obj[elem.toLowerCase()] + 1 || 1;
                return obj;
            }
            else {
                return obj;
            }
        }, {});
    }
};
