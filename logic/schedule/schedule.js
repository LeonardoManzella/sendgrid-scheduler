var db = require('../../db/db.mail');
var shdlr = require('../scheduler/schedule');

var schedule = {

  getAll: function() {
    return db.getAll();
  },

  getOne: function(schedule) {
    return db.getOne(schedule.scheduleId);
  },
  create: function(schedule) {
    schedule.isCompleted = false;
    var savedschedule = db.create(schedule);
    // Schedule Mail
    if (savedschedule) {
      if (String(savedschedule.scheduleAt).toLowerCase() != 'false') {
        savedschedule.mailJob = shdlr.scheduleMail(savedschedule);
      }
    }
    return savedschedule;
  },
  cancel: function(schedule) {
    return shdlr.cancelJob(schedule.scheduleId);
  },
  delete: function(schedule) {
    // cancel jobs
    shdlr.cancelJob(schedule.scheduleId);

    // remove the saved schedules
    require('../../db/db.schedule').deleteJob(schedule.scheduleId);

    // delete the schedule
    return db.delete(schedule.scheduleId);
  }
};

module.exports = schedule;
