const Cart = require("../models/cart.model");
const Product = require("../models/productmanagement.model");

// Récupérer le panier
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate("items.productId");
    if (!cart) return res.status(200).json({ items: [], total: 0 });

    const total = cart.items.reduce(
      (sum, item) => sum + item.priceAtAdd * item.quantity,
      0
    );

    res.json({ items: cart.items, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Ajouter au panier
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity)
      return res.status(400).json({ message: "Produit et quantité requis" });

    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({ message: "Produit introuvable" });

    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) cart = new Cart({ userId: req.user._id, items: [] });

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId,
        quantity,
        priceAtAdd: product.price,
      });
    }

    await cart.save();
    await cart.populate("items.productId");

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Modifier quantité
exports.updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || quantity == null)
      return res.status(400).json({ message: "Produit et quantité requis" });

    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(404).json({ message: "Panier introuvable" });

    const item = cart.items.find(
      (i) => i.productId.toString() === productId
    );
    if (!item)
      return res.status(404).json({ message: "Produit non trouvé dans le panier" });

    if (quantity <= 0) {
      cart.items = cart.items.filter(
        (i) => i.productId.toString() !== productId
      );
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    await cart.populate("items.productId");

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Supprimer un produit
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(404).json({ message: "Panier introuvable" });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    await cart.populate("items.productId");

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Vider le panier
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(404).json({ message: "Panier introuvable" });

    cart.items = [];
    await cart.save();

    res.json({ message: "Panier vidé" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Validation du panier
exports.validateCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Votre panier est vide" });
    }

    cart.items = [];
    await cart.save();

    res.json({ message: "Commande validée avec succès" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
