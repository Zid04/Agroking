// models/cart.model.js
const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1 },
  priceAtAdd: { type: Number, required: true },
});

const CartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [CartItemSchema],
    status: { type: String, enum: ['pending', 'confirmed', 'paid'], default: 'pending' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', CartSchema);
