'use strict';
var Twit = require('twit');
var keywordsDb = require('../../config/db/knex/knexConfig');
var wordSum = require('./services/wordSum');
var client = new Twit({
    consumer_key: 'YxFKenEd6yyHQ4xnGiZc1QTqN',
    consumer_secret: 'XDId696qRMFPnVyCVNhxCAs2Tsz9hrJ9gGTHGV903BxIkoaf6V',
    access_token: '46499008-H9zNdNv9mpoj6R3OCKdHBWKqVgEumZxH1irqWT0vo',
    access_token_secret: 'vrks3LHksxejJWgSWiTlJinPc3fJ0Knsf2Q4xoUlkMswG'
});
module.exports = (function () {
    function TwitterModel() {
    }
    TwitterModel.prototype.twitterSearch = function () {
        return new Promise(function (resolve, reject) {
            client.get('search/tweets', { q: 'hillary', count: 100 }, function (err, data, response) {
                if (err) {
                    reject(err);
                }
                else {
                    var databaseArray = wordSum.createDatabaseArray(data.statuses);
                    Promise.all(databaseArray).then(function () {
                        return keywordsDb.knex.raw("select text from current_keyword_mentions order by unix_timestamp")
                            .then(function (finalData) {
                            var wordArray = wordSum.createWordArray(finalData);
                            var finalCount = wordSum.createFinalCount(wordArray);
                            resolve(wordSum.sortObj(finalCount));
                        });
                    }).catch(function (error) { return console.log(error); });
                }
            });
        });
    };
    return TwitterModel;
}());
