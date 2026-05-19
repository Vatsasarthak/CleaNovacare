const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., Wash & Fold
  category: { type: String, required: true }, // e.g., Apparel, Home, Footwear
  description: { type: String },
  icon: { type: String },
  basePrice: { type: Number, required: true },
  unit: { type: String, default: 'piece' }, // piece, kg, pair
  estimatedHours: { type: Number, default: 48 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
