const express = require("express");
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  deleteOrder,
  updateOrderStatus
} = require("../controllers/order.controller");

const auth = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middleware");

const router = express.Router();

// Créer une commande (client)
router.post("/", auth, createOrder);

// Récupérer les commandes du user connecté
router.get("/", auth, getUserOrders);

// Récupérer TOUTES les commandes (admin)
router.get("/all", auth, admin, getAllOrders);

// Supprimer une commande
router.delete("/:id", auth, deleteOrder);

// Gestion des statuts (ADMIN)
router.put("/:id/status", auth, admin, updateOrderStatus);

module.exports = router;
