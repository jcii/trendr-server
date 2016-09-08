const streamDb = require('../../../config/db/knex/knexConfig')

module.exports = {
    uploadTweet: function (tweet) {
        let unix = new Date(tweet.created_at).getTime()
        let fullDate = new Date(tweet.created_at).toDateString()
        let hashtags = ''
        tweet.entities.hashtags.forEach(elem => hashtags += `${elem.text.replace(/[^a-zA-Z0-9\s]/g, '')} `)
        let text = tweet.text.replace(/[^a-zA-Z0-9\s]/g, '')
        return new Promise((resolve, reject) => {
            streamDb.knex.raw(`insert into keyword_tweets values (default, 1, '${text}', '${hashtags}', ${unix}, '${fullDate}')`).then(() => resolve())
        })
    } 
}