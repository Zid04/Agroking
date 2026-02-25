import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../../api/api";

export default function DashboardHome() {
  const [orders, setOrders] = useState([]);
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer toutes les commandes
        const ordersRes = await API.get("/api/orders/all");
        setOrders(ordersRes.data);

        // Récupérer tous les utilisateurs
        const usersRes = await API.get("/api/users");
        setUsersCount(usersRes.data.length);

      } catch (err) {
        console.error(err);
        alert("Erreur lors du chargement du dashboard");
      }
    };

    fetchData();
  }, []);

  // Calculs rapides
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === "En attente").length;
  const deliveredOrders = orders.filter(o => o.status === "Livrée").length;

  const statusColors = {
    "En attente": "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
    "En préparation": "bg-blue-500/20 text-blue-300 border-blue-500/40",
    "En livraison": "bg-cyan-500/20 text-cyan-300 border-purple-500/40",
    "Livrée": "bg-green-500/20 text-green-300 border-green-500/40",
    "Annulée": "bg-red-500/20 text-red-300 border-red-500/40",
  };

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bold text-cyan-400">Tableau de Bord</h1>

      {/* --- CARDS KPI --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md"
        >
          <h3 className="text-white/70">Total Commandes</h3>
          <p className="text-3xl font-bold text-white">{totalOrders}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md"
        >
          <h3 className="text-white/70">Clients</h3>
          <p className="text-3xl font-bold text-white">{usersCount}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md"
        >
          <h3 className="text-white/70">En attente</h3>
          <p className="text-3xl font-bold text-yellow-400">{pendingOrders}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md"
        >
          <h3 className="text-white/70">Livrées</h3>
          <p className="text-3xl font-bold text-green-400">{deliveredOrders}</p>
        </motion.div>

      </div>

      {/* --- TABLEAU DES COMMANDES --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10"
      >
        <h2 className="text-xl font-semibold mb-4">Dernières Commandes</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/20">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-white/70">ID</th>
                <th className="px-6 py-3 text-left text-white/70">Client</th>
                <th className="px-6 py-3 text-left text-white/70">Produits</th>
                <th className="px-6 py-3 text-left text-white/70">Quantité</th>
                <th className="px-6 py-3 text-left text-white/70">Statut</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/20">
              {orders.slice(0, 5).map((order) => (
                <tr key={order._id} className="hover:bg-white/10 transition">
                  <td className="px-6 py-4">{order._id}</td>
                  <td className="px-6 py-4">{order.user?.name || "Inconnu"}</td>
                  <td className="px-6 py-4">
                    {order.products.map((p) => p.product?.name).join(", ")}
                  </td>
                  <td className="px-6 py-4">
                    {order.products.reduce((sum, p) => sum + p.quantity, 0)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm border ${statusColors[order.status]}`}
                    >
                      {order.status}
                    </span>
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
