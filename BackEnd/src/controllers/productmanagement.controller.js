const Product = require('../models/productmanagement.model');
const cloudinary = require("../services/cloudinary");

// ===============================
// GET /api/productmanagement
// ===============================
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Erreur récupération produits", error: err });
  }
};

// ===============================
// POST /api/productmanagement
// ===============================
exports.createProduct = async (req, res) => {
  try {
    const { name, category, price } = req.body;

    let mediaUrl = null;
    let mediaId = null;

    // Upload Cloudinary si une image est envoyée
    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "agroking_products"
      });

      mediaUrl = upload.secure_url;   // URL Cloudinary HTTPS
      mediaId = upload.public_id;     // ID Cloudinary
    }

    const product = new Product({
      name,
      category,
      price,
      media: mediaUrl,
      mediaId: mediaId
    });

    await product.save();
    res.status(201).json(product);

  } catch (err) {
    res.status(500).json({ message: "Erreur création produit", error: err });
  }
};

// ===============================
// PUT /api/productmanagement/:id
// ===============================
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Produit introuvable" });

    // Si nouvelle image → supprimer l’ancienne
    if (req.file && product.mediaId) {
      await cloudinary.uploader.destroy(product.mediaId);
    }

    let mediaUrl = product.media;
    let mediaId = product.mediaId;

    // Upload nouvelle image si présente
    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "agroking_products"
      });

      mediaUrl = upload.secure_url;
      mediaId = upload.public_id;
    }

    product.name = req.body.name;
    product.category = req.body.category;
    product.price = req.body.price;
    product.media = mediaUrl;
    product.mediaId = mediaId;

    await product.save();
    res.json(product);

  } catch (err) {
    res.status(500).json({ message: "Erreur mise à jour produit", error: err });
  }
};

// ===============================
// DELETE /api/productmanagement/:id
// ===============================
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Produit introuvable" });

    // Supprimer l’image Cloudinary
    if (product.mediaId) {
      await cloudinary.uploader.destroy(product.mediaId);
    }

    await product.deleteOne();
    res.json({ message: "Produit supprimé" });

  } catch (err) {
    res.status(500).json({ message: "Erreur suppression produit", error: err });
  }
};
