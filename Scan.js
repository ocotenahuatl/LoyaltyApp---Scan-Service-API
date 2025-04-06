const mongoose = require('mongoose');

const ScanSchema = new mongoose.Schema({
  qrCode: { type: String, required: true },
  storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
  associateId: { type: mongoose.Schema.Types.ObjectId, ref: 'SalesAssociate' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  scanTime: { type: Date, default: Date.now },
  pointsAwarded: { type: Number, default: 0 }
});

module.exports = mongoose.model('Scan', ScanSchema);