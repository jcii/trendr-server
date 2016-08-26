"use strict";
var schedule = require('node-schedule');
var twitterModel = require('../../Models/Twitter/twitterApiModel');
var twitterStreamController = (function () {
    function twitterStreamController() {
    }
    twitterStreamController.prototype.startStream = function (stream) {
    };
    twitterStreamController.prototype.endStream = function (stream) {
    };
    twitterStreamController.prototype.runAll = function () {
    };
    twitterStreamController.prototype.runAllWithSchedule = function (cron) {
        schedule.scheduleJob(cron, this.runAll());
    };
    return twitterStreamController;
}());
exports.twitterStreamController = twitterStreamController;
