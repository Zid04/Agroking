const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },

  mediaUrl: { type: String },  
  youtubeUrl: { type: String },
  imageUrl: { type: String },

  type: { 
    type: String, 
    enum: ["video", "youtube", "image"], 
    default: "image" 
  },

  date: { type: String, default: new Date().getFullYear() },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Blog', blogSchema);
