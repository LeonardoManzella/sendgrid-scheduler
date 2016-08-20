var express = require('express');
var router = express.Router();
var schedule = require('./schedule');

// Schedule routes
router.get('/schedule', schedule.getAll);
router.get('/schedule/:scheduleId', schedule.getOne);
router.post('/schedule/create/', schedule.create);
router.put('/schedule/:scheduleId/cancel', schedule.cancel);
router.delete('/schedule/:scheduleId', schedule.delete);

module.exports = router;
