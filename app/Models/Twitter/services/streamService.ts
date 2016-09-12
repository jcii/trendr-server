const streamDb = require('../../../config/db/knex/knexConfig')

module.exports = {
    uploadTweet: function (tweet, trend_id) {
        let unix = new Date(tweet.created_at).getTime()
        let fullDate = new Date(tweet.created_at).toDateString()
        let hashtags = ''
        tweet.entities.hashtags.forEach(elem => hashtags += `${elem.text.replace(/[^a-zA-Z0-9\s]/g, '')} `)
        let text = tweet.text.replace(/[^a-zA-Z0-9\s]/g, '')
        return new Promise((resolve, reject) => {
            streamDb.knex.raw(`insert into keyword_tweets values (default, ${trend_id}, '${text}', '${hashtags}', ${unix}, '${fullDate}')`).then(() => {
                return streamDb.knex.raw(`select user_id from trends where id = ${trend_id}`).then(user_id => {
                    return streamDb.knex.raw(`select tweets_collected from tweets_collected where user_id = ${user_id.rows[0].user_id}`).then(count => {
                        let tweetTotal = Number(count.rows[0].tweets_collected) + 1
                        return streamDb.knex.raw(`update tweets_collected set tweets_collected = ${tweetTotal}`).then(() => {
                            console.log('updated tweets_collected');
                            resolve()
                        })
                    })
                })
            })
        })
    } 
}