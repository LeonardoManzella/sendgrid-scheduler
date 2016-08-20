var db = require('diskdb');
db = db.connect('database', ['schedules']);

module.exports = {
  getAll: function() {
    return db.schedules.find();
  },
  getOne: function(remId) {
    return db.schedules.findOne({
      "_id": remId
    });
  },
  create: function(schedule) {
    return db.schedules.save(schedule);
  },
  updateStatus: function(remid) {
    return db.schedules.update({
      "_id": remid
    }, {
      "isCompleted": true
    });
  },
  delete: function(remId) {
    return db.schedules.remove({
      "_id": remId
    });
  }
};
