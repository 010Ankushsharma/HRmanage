const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['employee', 'payroll', 'leave', 'attendance', 'system'],
    default: 'system'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Activity', activitySchema);
