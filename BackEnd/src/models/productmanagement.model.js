const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    category: { 
      type: String, 
      required: true,
      enum: ["Production", "Alimentation", "Infrastructure", "Outils", "Formation"]
    },

    price: { type: Number, required: true },

    media: { type: String },   
    mediaId: { type: String }  
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
