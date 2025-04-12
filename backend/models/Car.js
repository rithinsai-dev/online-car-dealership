const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  price: Number,
  mileage: Number,
  fuelType: String,
  transmission: String,
  features: [String],
  images: [String],
  availability: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Car', carSchema);
