const Product = require('../models/productmanagement.model');
const cloudinary = require("../services/cloudinary");

// GET /api/productmanagement
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Erreur récupération produits", error: err });
  }
};

// POST /api/productmanagement
exports.createProduct = async (req, res) => {
  try {
    const { name, category, price } = req.body;

    const product = new Product({
      name,
      category,
      price,
      media: req.file?.path || null,     
      mediaId: req.file?.filename || null // ID Cloudinary
    });

    await product.save();
    res.status(201).json(product);

  } catch (err) {
    res.status(500).json({ message: "Erreur création produit", error: err });
  }
};

// PUT /api/productmanagement/:id
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Produit introuvable" });

    // Si nouvelle image → supprimer l’ancienne
    if (req.file && product.mediaId) {
      await cloudinary.uploader.destroy(product.mediaId);
    }

    product.name = req.body.name;
    product.category = req.body.category;
    product.price = req.body.price;

    if (req.file) {
      product.media = req.file.path;
      product.mediaId = req.file.filename;
    }

    await product.save();
    res.json(product);

  } catch (err) {
    res.status(500).json({ message: "Erreur mise à jour produit", error: err });
  }
};

// DELETE /api/productmanagement/:id
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Produit introuvable" });

    if (product.mediaId) {
      await cloudinary.uploader.destroy(product.mediaId);
    }

    await product.deleteOne();

    res.json({ message: "Produit supprimé" });

  } catch (err) {
    res.status(500).json({ message: "Erreur suppression produit", error: err });
  }
};
