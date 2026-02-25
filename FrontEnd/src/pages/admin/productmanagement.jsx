import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Edit, Save, X } from "lucide-react";
import API from "../../api/api";

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    media: null
  });

  // Charger produits + catégories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProducts = await API.get("/api/productmanagement");
        setProducts(resProducts.data);

        const resCategories = await API.get("/api/productmanagement/categories");
        setCategories(resCategories.data);
      } catch (err) {
        console.error(err);
        alert("Erreur lors du chargement des données");
      }
    };

    fetchData();
  }, []);

  // Gestion des inputs
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({ ...formData, media: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Ajouter un produit
  const handleAdd = async () => {
    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("category", formData.category);
      payload.append("price", formData.price);
      if (formData.media) payload.append("media", formData.media);

      const res = await API.post("/api/productmanagement", payload);

      setProducts([...products, res.data]);
      setFormData({ name: "", category: "", price: "", media: null });
      alert("Produit ajouté avec succès !");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'ajout du produit");
    }
  };

  // Supprimer un produit
  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce produit ?")) return;

    try {
      await API.delete(`/api/productmanagement/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression");
    }
  };

  // Préparer l'édition
  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      media: null
    });
  };

  // Sauvegarder modification
  const handleSave = async (id) => {
    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("category", formData.category);
      payload.append("price", formData.price);
      if (formData.media) payload.append("media", formData.media);

      const res = await API.put(`/api/productmanagement/${id}`, payload);

      setProducts(products.map((p) => (p._id === id ? res.data : p)));
      setEditingId(null);
      setFormData({ name: "", category: "", price: "", media: null });
      alert("Produit mis à jour !");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour du produit");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: "", category: "", price: "", media: null });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-cyan-400">Gestion des Produits</h1>

      {/* Formulaire d'ajout */}
      {!editingId && (
        <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 max-w-3xl">
          <h2 className="text-2xl font-semibold text-white mb-4">Ajouter un produit</h2>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Nom du produit"
              value={formData.name}
              onChange={handleChange}
              className="px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20"
            />

            {/* SELECT CATEGORIE */}
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20"
            >
              <option value="">-- Choisir une catégorie --</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="price"
              placeholder="Prix (FCFA)"
              value={formData.price}
              onChange={handleChange}
              className="px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20"
            />

            <input
              type="file"
              name="media"
              accept="image/*"
              onChange={handleChange}
              className="text-white"
            />

            <button
              onClick={handleAdd}
              className="flex items-center gap-2 bg-purple-500 hover:bg-cyan-600 px-6 py-2 rounded-full text-white"
            >
              <Plus size={20} /> Ajouter
            </button>
          </div>
        </div>
      )}

      {/* Tableau */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="overflow-x-auto bg-white/5 backdrop-blur-md rounded-2xl border border-white/10"
      >
        <table className="min-w-full divide-y divide-white/20">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-white/70">ID</th>
              <th className="px-6 py-3 text-left text-white/70">Nom</th>
              <th className="px-6 py-3 text-left text-white/70">Catégorie</th>
              <th className="px-6 py-3 text-left text-white/70">Prix</th>
              <th className="px-6 py-3 text-left text-white/70">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/20">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-white/10 transition">
                <td className="px-6 py-4">{product._id}</td>

                {/* Nom */}
                <td className="px-6 py-4">
                  {editingId === product._id ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="px-2 py-1 rounded bg-white/10 text-white border border-white/20 w-full"
                    />
                  ) : (
                    product.name
                  )}
                </td>

                {/* Catégorie */}
                <td className="px-6 py-4">
                  {editingId === product._id ? (
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                     className="px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 appearance-none bg-transparent"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  ) : (
                    product.category
                  )}
                </td>

                {/* Prix */}
                <td className="px-6 py-4">
                  {editingId === product._id ? (
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="px-2 py-1 rounded bg-white/10 text-white border border-white/20 w-full"
                    />
                  ) : (
                    product.price
                  )}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 flex gap-2">
                  {editingId === product._id ? (
                    <>
                      <button
                        className="p-2 bg-green-500 hover:bg-green-600 rounded-full"
                        onClick={() => handleSave(product._id)}
                      >
                        <Save size={16} />
                      </button>

                      <button
                        className="p-2 bg-red-500 hover:bg-red-600 rounded-full"
                        onClick={handleCancel}
                      >
                        <X size={16} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full"
                        onClick={() => handleEdit(product)}
                      >
                        <Edit size={16} />
                      </button>

                      <button
                        className="p-2 bg-red-500 hover:bg-red-600 rounded-full"
                        onClick={() => handleDelete(product._id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
