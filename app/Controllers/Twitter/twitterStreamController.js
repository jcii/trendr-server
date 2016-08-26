const schedule = require('node-schedule')
const twitterModel = require('../../Models/Twitter/twitterApiModel')

module.exports = class twitterStreamController {
  constructor() { }
  startStream(stream) {

  }
  endStream(stream) {
    
  }
  runAll(){

  }
  runAllWithSchedule(cron) {
    schedule.scheduleJob(cron, this.runAll())
  }
}