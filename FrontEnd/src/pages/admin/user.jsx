import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Edit, Plus } from "lucide-react";
import API from "../../api/api";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tel: "",
    password: "",
    role: "user"
  });

  // Charger tous les utilisateurs
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await API.get("/api/users");
        setClients(res.data);
      } catch (err) {
        console.error(err);
        alert("Erreur lors du chargement des utilisateurs");
      }
    };

    fetchClients();
  }, []);

  // Supprimer un utilisateur
  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      try {
        await API.delete(`/api/users/${id}`);
        setClients(clients.filter((c) => c._id !== id));
      } catch (err) {
        console.error(err);
        alert("Erreur lors de la suppression");
      }
    }
  };

  // Ouvrir le formulaire d'édition
  const handleEdit = (client) => {
    setIsEditing(true);
    setEditId(client._id);
    setShowForm(true);

    setFormData({
      name: client.name,
      email: client.email,
      tel: client.tel || "",
      password: "",
      role: client.role
    });
  };

  // Ajouter ou modifier un utilisateur
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        // UPDATE
        const res = await API.put(`/api/users/${editId}`, formData);

        setClients(
          clients.map((c) => (c._id === editId ? res.data.user : c))
        );

        alert("Utilisateur mis à jour !");
      } else {
        // CREATE
        const res = await API.post("/api/users/create", formData);
        setClients([...clients, res.data.user]);
        alert("Utilisateur créé !");
      }

      // Reset
      setShowForm(false);
      setIsEditing(false);
      setEditId(null);
      setFormData({
        name: "",
        email: "",
        tel: "",
        password: "",
        role: "user"
      });

    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'opération");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-cyan-400">Gestion des utilisateurs</h1>

        <button
          onClick={() => {
            setShowForm(!showForm);
            setIsEditing(false);
            setFormData({
              name: "",
              email: "",
              tel: "",
              password: "",
              role: "user"
            });
          }}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl text-white"
        >
          <Plus size={18} />
          Ajouter
        </button>
      </div>

      {/* FORMULAIRE AJOUT / EDIT */}
      {showForm && (
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 p-6 rounded-xl border border-white/20 space-y-4"
        >
          <h2 className="text-xl font-bold text-white">
            {isEditing ? "Modifier l'utilisateur" : "Créer un utilisateur"}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nom"
              className="p-3 rounded bg-white/20 text-white"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <input
              type="email"
              placeholder="Email"
              className="p-3 rounded bg-white/20 text-white"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <input
              type="text"
              placeholder="Téléphone"
              className="p-3 rounded bg-white/20 text-white"
              value={formData.tel}
              onChange={(e) => setFormData({ ...formData, tel: e.target.value })}
            />

            {!isEditing && (
              <input
                type="password"
                placeholder="Mot de passe"
                className="p-3 rounded bg-white/20 text-white"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required={!isEditing}
              />
            )}

            <select
              className="p-3 rounded bg-white/20 text-white"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="user">Utilisateur</option>
              <option value="admin">Administrateur</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl text-white"
          >
            {isEditing ? "Mettre à jour" : "Créer"}
          </button>
        </motion.form>
      )}

      {/* TABLEAU DES UTILISATEURS */}
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
                <th className="px-6 py-3 text-left text-white/70">Nom</th>
                <th className="px-6 py-3 text-left text-white/70">Email</th>
                <th className="px-6 py-3 text-left text-white/70">Téléphone</th>
                <th className="px-6 py-3 text-left text-white/70">Rôle</th>
                <th className="px-6 py-3 text-left text-white/70">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/20">
              {clients.map((client) => (
                <tr key={client._id} className="hover:bg-white/10 transition">
                  <td className="px-6 py-4">{client._id}</td>
                  <td className="px-6 py-4">{client.name}</td>
                  <td className="px-6 py-4">{client.email}</td>
                  <td className="px-6 py-4">{client.tel || "—"}</td>
                  <td className="px-6 py-4 text-purple-300 font-semibold">
                    {client.role}
                  </td>

                  <td className="px-6 py-4 flex gap-2">
                    <button
                      className="p-2 bg-yellow-500 hover:bg-yellow-600 rounded-full"
                      onClick={() => handleEdit(client)}
                    >
                      <Edit size={16} />
                    </button>

                    <button
                      className="p-2 bg-red-500 hover:bg-red-600 rounded-full"
                      onClick={() => handleDelete(client._id)}
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
