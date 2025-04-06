const mongoose = require('mongoose');

const QRCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  points: { type: Number, required: true },
  productName: { type: String, required: true },
  description: { type: String }
});

module.exports = mongoose.model('QRCode', QRCodeSchema);