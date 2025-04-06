const mongoose = require('mongoose');

const SalesAssociateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photoUrl: { type: String },
  storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true } // Link to Store
});

module.exports = mongoose.model('SalesAssociate', SalesAssociateSchema);