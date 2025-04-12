const mongoose = require('mongoose');

const testDriveSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  userPhone: String,
  date: String,
  timeSlot: String,
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  }
});

module.exports = mongoose.model('TestDrive', testDriveSchema);
