const schedule = require('node-schedule')
const twitterModel = require('../../Models/Twitter/twitterApiModel')

module.exports = class twitterStreamController {
  constructor() { }
  startStream(stream: String) {

  }
  endStream(stream: String) {
    
  }
  runAll(){

  }
  runAllWithSchedule(cron: String) {
    schedule.scheduleJob(cron, this.runAll())
  }
}