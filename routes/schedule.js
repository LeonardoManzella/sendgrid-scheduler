var msg = require('../messages/messages.js');

var schedule = {

    getAll: function (req, res) {
        var schedule;
        try {
            schedule = require('../logic/schedule/schedule').getAll();
            res.status(200);
            res.json({
                "status": 200,
                "message": msg.gbl_success,
                "schedules": schedule
            });
        } catch (e) {
            res.status(500);
            res.json({
                "status": 500,
                "message": msg.gbl_oops
            });
        }

    },
    getOne: function (req, res) {
        var rem = req.params;
        if (!rem.scheduleId) {
            // Invalid Data
            res.status(400);
            res.json({
                "status": 400,
                "message": msg.schedule_inputError
            });
        } else {
            try {
                var schedule = require('../logic/schedule/schedule').getOne(rem);
                res.status(200);
                res.json({
                    "status": 200,
                    "message": msg.gbl_success,
                    "schedule": schedule
                });
            } catch (e) {
                res.status(500);
                res.json({
                    "status": 500,
                    "message": msg.gbl_oops
                });
            }

        }
    },
    create: function (req, res) {
        var schedule = req.body;
        console.log(schedule);

        if (!schedule.scheduleAt || !schedule.apiKey || !schedule.to || !schedule.from || !schedule.subject) {
            // Invalid Data
            res.status(400);
            res.json({
                "status": 400,
                "message": msg.schedule_inputError
            });

        } else {
            /*         ***** To-Do validate incoming items *****
             var _v = require('../util/validate');
             if (!_v.validateSchdl(schedule.to) || !_v.validateSchdl(schedule.from)) {
             res.status(400);
             res.json({
             "status": 400,
             "message": msg.schedule_ShdlError
             });
             return;
             }
             */
            try {
                var savedschedule = require('../logic/schedule/schedule').create(schedule);
                res.status(200);
                res.json({
                    "status": 200,
                    "message": msg.reminder_newscheduleSuccess,
                    "schedule": savedschedule
                });
            }
            catch (e) {
                console.log(e);
                res.status(500);
                res.json({
                    "status": 500,
                    "message": msg.gbl_oops
                });
            }

        }
    },
    delete: function (req, res) {
        var rem = req.params;
        if (!rem.scheduleId) {
            // Invalid Data
            res.status(400);
            res.json({
                "status": 400,
                "message": msg.schedule_inputError
            });
        } else {
            try {
                var schedule = require('../logic/schedule/schedule').delete(rem);
                res.status(200);
                res.json({
                    "status": 200,
                    "message": msg.gbl_success,
                    "delete": schedule
                });
            } catch (e) {
                res.status(500);
                res.json({
                    "status": 500,
                    "message": msg.gbl_oops
                });
            }

        }
    },
    cancel: function (req, res) {
        var schedule = req.params;
        if (!schedule.scheduleId) {
            // Invalid Data
            res.status(400);
            res.json({
                "status": 400,
                "message": msg.schedule_inputError
            });
        } else {
            try {
                var status = require('../logic/schedule/schedule').cancel(schedule);
                res.status(200);
                res.json({
                    "status": 200,
                    "message": msg.gbl_success,
                    "resp": status
                });
            } catch (e) {
                res.status(500);
                res.json({
                    "status": 500,
                    "message": msg.gbl_oops
                });
            }
        }
    }
};

module.exports = schedule;
