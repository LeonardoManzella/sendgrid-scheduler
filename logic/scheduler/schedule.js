var schDB = require('../../db/db.schedule');
var remDB = require('../../db/db.mail');
var tMail = require('../sendgrid/triggerMail');

var schedule = require('node-schedule');

var scheduler = {

    scheduleMail: function (reminder) {

        var job = schedule.scheduleJob('job_mail_' + reminder._id, new Date(parseInt(reminder.scheduleAt)), function () {
            tMail.triggerMail(reminder);
            remDB.updateStatus(reminder._id);
        });

        job.reminderId = reminder._id; // Tag the job with a reminder ID
        return schDB.saveJob(job);
    },

    cancelJob: function (scheduleId) {
        var jobs = schedule.scheduledJobs;

        var mailJob = jobs["job_mail_" + scheduleId];

        if (mailJob) {
            mailJob.cancel();
        }

        return true;
    }
};

module.exports = scheduler;
