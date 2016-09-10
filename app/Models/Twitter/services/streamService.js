var streamDb = require('../../../config/db/knex/knexConfig');
module.exports = {
    uploadTweet: function (tweet, trend_id) {
        var unix = new Date(tweet.created_at).getTime();
        var fullDate = new Date(tweet.created_at).toDateString();
        var hashtags = '';
        tweet.entities.hashtags.forEach(function (elem) { return hashtags += elem.text.replace(/[^a-zA-Z0-9\s]/g, '') + " "; });
        var text = tweet.text.replace(/[^a-zA-Z0-9\s]/g, '');
        return new Promise(function (resolve, reject) {
            streamDb.knex.raw("insert into keyword_tweets values (default, " + trend_id + ", '" + text + "', '" + hashtags + "', " + unix + ", '" + fullDate + "')").then(function () { return resolve(); });
        });
    }
};
