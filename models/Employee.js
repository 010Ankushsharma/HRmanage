const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  department: {
    type: String,
    required: true,
    enum: ['HR', 'IT', 'Sales', 'Marketing', 'Finance']
  },
  position: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  joiningDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Active', 'Inactive', 'On Leave'],
    default: 'Active'
  },
  avatar: {
    type: String,
    default: '/images/default-avatar.png'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Employee', employeeSchema);
