const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  siteName: { type: String, default: "Agroking" },
  emailAdmin: { type: String, default: "agroking1995@gmail.com" },
  notifications: { type: Boolean, default: true },
  maintenance: { type: Boolean, default: false },
});

module.exports = mongoose.model("Settings", settingsSchema);
