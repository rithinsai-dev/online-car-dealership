const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  userPhone: String,
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  paymentMethod: String,
  status: {
    type: String,
    enum: ['paid', 'shipped'],
    default: 'paid',
  },
});

module.exports = mongoose.model('Purchase', purchaseSchema);
