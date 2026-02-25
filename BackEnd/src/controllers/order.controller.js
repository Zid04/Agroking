const Order = require("../models/order.model");
const Product = require("../models/productmanagement.model");

// Créer une commande (client)
exports.createOrder = async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "Aucun produit dans la commande" });
    }

    let totalPrice = 0;
    let validProducts = [];

    for (let item of products) {
      const prod = await Product.findById(item.product);

      if (!prod) {
        console.log("Produit introuvable, ignoré :", item.product);
        continue;
      }

      totalPrice += prod.price * item.quantity;

      validProducts.push({
        product: item.product,
        quantity: item.quantity
      });
    }

    if (validProducts.length === 0) {
      return res.status(400).json({ message: "Aucun produit valide dans la commande" });
    }

    const order = new Order({
      user: req.user.id, // ✔ CORRECTION ICI
      products: validProducts,
      totalPrice,
      status: "En attente"
    });

    await order.save();

    res.status(201).json(order);

  } catch (err) {
    console.error("Erreur création commande :", err);
    res.status(500).json({ message: "Erreur création commande", error: err });
  }
};

// Récupérer les commandes du user connecté
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("products.product")
      .populate("user", "name email");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Erreur récupération commandes", error: err });
  }
};

// Récupérer TOUTES les commandes (ADMIN)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product", "name price");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Erreur récupération commandes admin", error: err });
  }
};

// Supprimer une commande
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Commande introuvable" });
    }

    await Order.findByIdAndDelete(id);

    res.json({ message: "Commande supprimée" });

  } catch (err) {
    res.status(500).json({ message: "Erreur suppression commande", error: err });
  }
};

// Gestion des statuts (ADMIN)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatus = [
      "En attente",
      "En préparation",
      "En livraison",
      "Livrée",
      "Annulée"
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Statut invalide" });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Commande introuvable" });
    }

    order.status = status;
    await order.save();

    res.json({ message: "Statut mis à jour", order });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
