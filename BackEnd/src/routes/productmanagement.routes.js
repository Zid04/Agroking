const express = require("express");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productmanagement.controller");

const auth = require("../middlewares/auth.middleware");
const adminAuth = require("../middlewares/admin.middleware");
const upload = require("../middlewares/upload");
const Product = require("../models/productmanagement.model");

const router = express.Router();

router.get("/categories", (req, res) => {
  const categories = Product.schema.path("category").enumValues;
  res.json(categories);
});

// Récupérer tous les produits
router.get("/", getProducts);

// Ajouter un produit
router.post("/", auth, adminAuth, upload, createProduct);

// Modifier un produit
router.put("/:id", auth, adminAuth, upload, updateProduct);

// Supprimer un produit
router.delete("/:id", auth, adminAuth, deleteProduct);

module.exports = router;
