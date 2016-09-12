var streamDb = require('../../../config/db/knex/knexConfig');
module.exports = {
    uploadTweet: function (tweet, trend_id) {
        var unix = new Date(tweet.created_at).getTime();
        var fullDate = new Date(tweet.created_at).toDateString();
        var hashtags = '';
        tweet.entities.hashtags.forEach(function (elem) { return hashtags += elem.text.replace(/[^a-zA-Z0-9\s]/g, '') + " "; });
        var text = tweet.text.replace(/[^a-zA-Z0-9\s]/g, '');
        var screen_name = tweet.user.screen_name.replace(/[^a-zA-Z0-9\s]/g, '');
        if (tweet.user.location == null) {
            tweet.user.location = 'Unknown';
        }
        var location = tweet.user.location.replace(/[^a-zA-Z0-9\s]/g, '');
        var profile_image = tweet.user.profile_image_url;
        return new Promise(function (resolve, reject) {
            streamDb.knex.raw("insert into keyword_tweets values (default, " + trend_id + ", '" + text + "', '" + hashtags + "', " + unix + ", '" + fullDate + "', '" + screen_name + "', '" + location + "', '" + profile_image + "')").then(function () {
                return streamDb.knex.raw("select user_id from trends where id = " + trend_id).then(function (user_id) {
                    return streamDb.knex.raw("select tweets_collected from tweets_collected where user_id = " + user_id.rows[0].user_id).then(function (count) {
                        var tweetTotal = Number(count.rows[0].tweets_collected) + 1;
                        return streamDb.knex.raw("update tweets_collected set tweets_collected = " + tweetTotal).then(function () {
                            console.log('updated tweets_collected');
                            resolve();
                        });
                    });
                });
            });
        });
    }
};
