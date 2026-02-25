// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS middleware - allow requests from frontend
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


// Middleware global pour parser le JSON
app.use(express.json());
// === SERVIR LES IMAGES === 
const path = require("path"); 
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// ===== ROUTES =====
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/orders', require('./routes/order.routes'));
app.use('/api/productmanagement', require('./routes/productmanagement.routes'));
app.use('/api/cart', require('./routes/cart.routes'));
app.use('/api/blogs', require('./routes/blog.routes'));
app.use("/api/settings", require("./routes/settings.routes"));


app.get("/", (req, res) => {
  res.send("API Agroking fonctionne ");
});

// ===== CONNEXION MONGODB =====
const mongoUri = process.env.MONGO_URI;



mongoose
  .connect(mongoUri)
  .then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server running sur le port ${port}`));
  })
  .catch((err) => console.error("Erreur connexion MongoDB :", err));
  console.log("Mongo URI:", process.env.MONGO_URI);
