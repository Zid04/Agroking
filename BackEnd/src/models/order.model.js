const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1 }
    }
  ],
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ["En attente", "En préparation", "En livraison", "Livrée", "Annulée"],
    default: "En attente"
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
