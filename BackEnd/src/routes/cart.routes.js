const express = require("express");
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  validateCart
} = require("../controllers/cart.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", authMiddleware, getCart);
router.post("/", authMiddleware, addToCart);
router.put("/", authMiddleware, updateCartItem);
router.delete("/item/:productId", authMiddleware, removeFromCart);
router.delete("/clear", authMiddleware, clearCart);
router.post("/validate", authMiddleware, validateCart);

module.exports = router;
