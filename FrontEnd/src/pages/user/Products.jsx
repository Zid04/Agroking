// ProductsSection.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Section } from "../../components/ui/section";
import API from "../../api/api";

const categories = ["Tous", "Production", "Alimentation", "Infrastructure", "Outils", "Formation"];

export default function ProductsSection() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const navigate = useNavigate();

  const handleAuthError = (err, actionName = "cette action") => {
    if (err.response?.status === 401) {
      alert(`Veuillez vous connecter pour ${actionName}.`);
      navigate("/login");
      return true;
    }
    return false;
  };

  // Charger les produits
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/productmanagement");
        setProducts(res.data);
      } catch (err) {
        console.error("Erreur chargement produits", err);
      }
    };
    fetchProducts();
  }, []);

  // Charger le panier
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await API.get("/cart");
        setCart(res.data.items || []);
      } catch {
        console.warn("Panier non chargé (utilisateur non connecté)");
      }
    };
    fetchCart();
  }, []);

  // Ajouter au panier
  const handleAddToCart = async (product, qty = 1) => {
    try {
      const res = await API.post("/cart", {
        productId: product._id,
        quantity: qty,
      });
      setCart(res.data.items);
    } catch (err) {
      if (!handleAuthError(err, "ajouter un produit au panier")) {
        alert(err.response?.data?.message || "Erreur lors de l'ajout au panier");
      }
    }
  };

  // Modifier quantité
  const updateQuantity = async (productId, newQty) => {
    if (!productId || newQty < 1) return;
    try {
      const res = await API.put("/cart", {
        productId,
        quantity: newQty,
      });
      setCart(res.data.items);
    } catch (err) {
      handleAuthError(err, "modifier la quantité");
    }
  };

  // Supprimer un produit
  const removeItem = async (productId) => {
    if (!productId) return;
    try {
      const res = await API.delete(`/cart/item/${productId}`);
      setCart(res.data.items);
    } catch (err) {
      handleAuthError(err, "supprimer un produit du panier");
    }
  };

  // Vider le panier
  const clearCart = async () => {
    try {
      await API.delete("/cart/clear");
      setCart([]);
    } catch (err) {
      handleAuthError(err, "vider votre panier");
    }
  };

  // Valider la commande
  const validateOrder = async () => {
    try {
      const formattedProducts = cart.map(item => ({
        product: item.productId._id,
        quantity: item.quantity
      }));

      await API.post("/orders", { products: formattedProducts });

      alert("Commande envoyée !");
      clearCart();
    } catch (err) {
      if (!handleAuthError(err, "valider votre commande")) {
        alert(err.response?.data?.message || "Erreur lors de la validation de la commande");
      }
    }
  };

  const filteredProducts =
    selectedCategory === "Tous"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const total = cart.reduce(
    (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
    0
  );

  return (
    <Section title="Nos Produits" className="bg-transparent text-white py-24 text-center">
      <p>Découvrez nos variétés de produits ici</p>

      {/* Catégories */}
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border transition ${
              selectedCategory === cat
                ? "bg-cyan-400 text-white border-blue-500"
                : "bg-white/5 text-white border-white/20 hover:bg-cyan-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Produits */}
      <div className="grid md:grid-cols-3 gap-10">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="bg-transparent rounded-2xl overflow-hidden border border-white/10 hover:-translate-y-1 transition"
          >
            <div className="relative h-56 w-full overflow-hidden">
              <img
                src={
                  product.media?.startsWith("http")
                    ? product.media
                    : "/default-product.jpg"
                }
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-6 space-y-3">
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-white/70 text-sm">{product.category}</p>
              <p className="text-white/90 font-medium">{product.price} FCFA</p>

              <button
                onClick={() => handleAddToCart(product, 1)}
                className="flex items-center gap-2 mt-2 text-blue-400 font-medium hover:gap-3 transition-all"
              >
                Ajouter à votre panier <ShoppingCart size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Panier */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 right-6 bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-xl w-80">
          <h3 className="text-xl font-semibold text-white mb-4">Panier</h3>

          <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-white/90">
                <div>
                  <p className="font-medium">{item.productId?.name || "Produit supprimé"}</p>
                  <p className="text-sm text-white/60">x {item.quantity}</p>

                  <div className="flex gap-2 mt-1">
                    <button
                      className="px-2 bg-white/20 rounded"
                      onClick={() =>
                        item.productId &&
                        updateQuantity(item.productId._id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <button
                      className="px-2 bg-white/20 rounded"
                      onClick={() =>
                        item.productId &&
                        updateQuantity(item.productId._id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-semibold">
                    {item.productId ? item.productId.price * item.quantity : 0} FCFA
                  </p>

                  <button
                    className="text-red-400 text-sm mt-1 flex items-center gap-1"
                    onClick={() =>
                      item.productId && removeItem(item.productId._id)
                    }
                  >
                    <Trash2 size={14} /> Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between font-bold text-white mt-4 text-lg">
            <span>Total :</span>
            <span>{total} FCFA</span>
          </div>

          <button
            className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition"
            onClick={clearCart}
          >
            Vider le panier
          </button>

          <button
            className="w-full mt-3 bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-lg font-semibold transition"
            onClick={validateOrder}
          >
            Valider la commande
          </button>
        </div>
      )}
    </Section>
  );
}
