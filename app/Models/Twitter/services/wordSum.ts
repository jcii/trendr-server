const wordSumDb = require('../../../config/db/knex/knexConfig')

module.exports = {
    sortObj: function(obj, trend_id) {
        let arr = []
        let dataPoints = []
        let axisLabels = []
        for (let key in obj) {
            arr.push([key, obj[key]])
        }
        let finalCount = arr.sort((a, b) => a[1] - b[1]).reverse().slice(0, 5).reduce((obj, elem) => {
            obj[elem[0]] = elem[1]
            return obj
        }, {})
        let total:number = 0
        for (let key in finalCount) {
            axisLabels.push(key)
            dataPoints.push(finalCount[key])
            total += finalCount[key]
        }
        return {
            axisLabels,
            dataPoints,
            total
        }
    },

    createDatabaseArray: function (arr) {
        let databaseArray = []
        arr.forEach(tweet => {
            let unix = new Date(tweet.created_at).getTime()
            let fullDate = new Date(tweet.created_at).toDateString()
            let hashtags = ''
            tweet.entities.hashtags.forEach(elem => hashtags += `${elem.text} `)
            let text = tweet.text.replace(/[^a-zA-Z0-9\s]/g, '')
            databaseArray.push(
                wordSumDb.knex.raw(`insert into current_keyword_mentions values (default, 1, '${text}', '${hashtags}', ${unix}, '${fullDate}')`)
            )
        })
        return databaseArray
    },

    createWordArray: function (finalData) {
        let wordArray = []
        finalData.rows.forEach(elem => {
            elem.text.split(' ').forEach(word => wordArray.push(word))
        })
        return wordArray
    }, 

    createFinalCount: function (wordArray, keyword) {
        return wordArray.reduce((obj, elem) => {
            if (elem.length >= 5 && !elem.toLowerCase().includes(keyword)) {
                obj[elem.toLowerCase()] = obj[elem.toLowerCase()] + 1 || 1
                return obj
            } else {
                return obj
            }
        }, {})
    }
}