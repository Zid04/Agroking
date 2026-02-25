import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Eye, Edit } from "lucide-react";
import API from "../../api/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  // Charger toutes les commandes (ADMIN)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
       
        const res = await API.get("/orders/all");
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        alert("Erreur lors du chargement des commandes");
      }
    };

    fetchOrders();
  }, []);

  // Mise à jour du statut
  const updateStatus = async (id, newStatus) => {
    try {
      // ✔ ROUTE CORRIGÉE
      await API.put(`/orders/${id}/status`, { status: newStatus });

      setOrders((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, status: newStatus } : o
        )
      );
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour du statut");
    }
  };

  // Supprimer une commande
  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette commande ?")) {
      try {
       
        await API.delete(`/orders/${id}`);
        setOrders(orders.filter((o) => o._id !== id));
      } catch (err) {
        console.error(err);
        alert("Erreur lors de la suppression");
      }
    }
  };

  // Style des badges selon statut
  const statusColors = {
    "En attente": "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
    "En préparation": "bg-blue-500/20 text-blue-300 border-blue-500/40",
    "En livraison": "bg-purple-500/20 text-purple-300 border-purple-500/40",
    "Livrée": "bg-green-500/20 text-green-300 border-green-500/40",
    "Annulée": "bg-red-500/20 text-red-300 border-red-500/40",
  };

  const statusOptions = [
    "En attente",
    "En préparation",
    "En livraison",
    "Livrée",
    "Annulée",
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-cyan-400">Commandes</h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/20">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-white/70">ID</th>
                <th className="px-6 py-3 text-left text-white/70">Client</th>
                <th className="px-6 py-3 text-left text-white/70">Produits</th>
                <th className="px-6 py-3 text-left text-white/70">Quantité totale</th>
                <th className="px-6 py-3 text-left text-white/70">Statut</th>
                <th className="px-6 py-3 text-left text-white/70">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/20">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-white/10 transition">
                  <td className="px-6 py-4">{order._id}</td>

                  <td className="px-6 py-4">
                    {order.user?.name || "Inconnu"}
                  </td>

                  <td className="px-6 py-4">
                    {order.products
                      .map((p) => p.product?.name || "Produit supprimé")
                      .join(", ")}
                  </td>

                  <td className="px-6 py-4">
                    {order.products.reduce((sum, p) => sum + p.quantity, 0)}
                  </td>

                  {/* BADGE + SELECT */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm border ${statusColors[order.status]}`}
                      >
                        {order.status}
                      </span>

                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                        className="bg-gray-800 text-white p-2 rounded-lg border border-white/20"
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>

                  <td className="px-6 py-4 flex gap-2">
                    <button className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full">
                      <Eye size={16} />
                    </button>

                    <button className="p-2 bg-yellow-500 hover:bg-yellow-600 rounded-full">
                      <Edit size={16} />
                    </button>

                    <button
                      className="p-2 bg-red-500 hover:bg-red-600 rounded-full"
                      onClick={() => handleDelete(order._id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </motion.div>
    </div>
  );
}
