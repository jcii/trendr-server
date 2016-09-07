'use strict';
var Twit = require('twit');
var keywordsDb = require('../../config/db/knex/knexConfig');
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
            client.get('search/tweets', { q: 'banana', count: 100 }, function (err, data, response) {
                if (err) {
                    reject(err);
                }
                else {
                    console.log(data.statuses[0].entities);
                    var databaseArray_1 = [];
                    data.statuses.forEach(function (tweet) {
                        var unix = new Date(tweet.created_at).getTime();
                        var fullDate = new Date(tweet.created_at).toDateString();
                        var hashtags = '';
                        tweet.entities.hashtags.forEach(function (elem) { return hashtags += elem.text + " "; });
                        var text = tweet.text.replace(/[^a-zA-Z0-9\s]/g, '');
                        databaseArray_1.push(keywordsDb.knex.raw("insert into current_keyword_mentions values (default, 1, '" + text + "', '" + hashtags + "', " + unix + ", '" + fullDate + "')"));
                    });
                    Promise.all(databaseArray_1).then(function () {
                        return keywordsDb.knex.raw("select text from current_keyword_mentions order by unix_timestamp")
                            .then(function (finalData) {
                            var wordArray = [];
                            finalData.rows.forEach(function (elem) {
                                elem.text.split(' ').forEach(function (word) { return wordArray.push(word); });
                            });
                            var finalCount = wordArray.reduce(function (obj, elem) {
                                if (elem.length >= 5) {
                                    obj[elem.toLowerCase()] = obj[elem.toLowerCase()] + 1 || 1;
                                    return obj;
                                }
                                else {
                                    return obj;
                                }
                            }, {});
                            resolve(finalCount);
                        });
                    }).catch(function (error) { return console.log(error); });
                }
            });
        });
    };
    return TwitterModel;
}());
