var streamDb = require('../../../config/db/knex/knexConfig');
module.exports = {
    uploadTweet: function (tweet) {
        var unix = new Date(tweet.created_at).getTime();
        var fullDate = new Date(tweet.created_at).toDateString();
        var hashtags = '';
        tweet.entities.hashtags.forEach(function (elem) { return hashtags += elem.text + " "; });
        var text = tweet.text.replace(/[^a-zA-Z0-9\s]/g, '');
        return streamDb.knex.raw("insert into keyword_tweets values (default, 1, '" + text + "', '" + hashtags + "', " + unix + ", '" + fullDate + " )");
    }
};
