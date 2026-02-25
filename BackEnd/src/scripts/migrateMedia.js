// scripts/migrateMedia.js
require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const cloudinary = require("../services/cloudinary");
const Product = require("../models/productmanagement.model");

const LOCAL_UPLOADS_DIR = path.join(__dirname, "../uploads");

async function migrate() {
  try {
    console.log("Connexion MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Recherche des produits avec media local...");
    const products = await Product.find();

    for (const product of products) {
      if (!product.media) continue;

      // Si l'image est déjà Cloudinary → on ignore
      if (product.media.startsWith("http")) {
        console.log(`${product.name} déjà migré`);
        continue;
      }

      const localPath = path.join(LOCAL_UPLOADS_DIR, product.media);

      if (!fs.existsSync(localPath)) {
        console.log(`Image introuvable localement : ${product.media}`);
        continue;
      }

      console.log(`⬆ Upload Cloudinary : ${product.media}`);

      const uploadResult = await cloudinary.uploader.upload(localPath, {
        folder: "agroking_products",
      });

      // Mise à jour du produit
      product.media = uploadResult.secure_url;
      product.mediaPublicId = uploadResult.public_id;
      await product.save();

      console.log(` Migré : ${product.name}`);
    }

    console.log("Migration terminée !");
    process.exit();
  } catch (err) {
    console.error("ERREUR MIGRATION :", err);
    process.exit(1);
  }
}

migrate();
