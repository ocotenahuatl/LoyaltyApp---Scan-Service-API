const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }  // [longitude, latitude]
  },
  salesAssociates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SalesAssociate' }] // Array of associates
});

module.exports = mongoose.model('Store', StoreSchema);