import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import API from "../../api/api";
import { toast } from "react-hot-toast";

export default function Settings() {
  const [settings, setSettings] = useState(null);

  // Charger les paramètres depuis le backend
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        
        const res = await API.get("/settings");
        setSettings(res.data);
      } catch {
        toast.error("Erreur chargement paramètres");
      }
    };
    fetchSettings();
  }, []);

  if (!settings) return <p className="text-white">Chargement...</p>;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({ ...settings, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      await API.put("/settings", settings);
      toast.success("Paramètres sauvegardés !");
    } catch {
      toast.error("Erreur sauvegarde");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-10"
    >
      <h1 className="text-4xl font-bold text-blue-400">Paramètres</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 max-w-3xl space-y-8"
      >
        {/* SECTION : Informations générales */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Informations générales</h2>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-white/70">Nom du site</label>
              <input
                type="text"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                className="bg-white/10 border border-white/20 p-3 rounded-lg text-white"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white/70">Email Administrateur</label>
              <input
                type="email"
                name="emailAdmin"
                value={settings.emailAdmin}
                onChange={handleChange}
                className="bg-white/10 border border-white/20 p-3 rounded-lg text-white"
              />
            </div>
          </div>
        </div>

        {/* SECTION : Préférences */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Préférences</h2>

          {/* Notifications */}
          <div className="flex items-center justify-between bg-white/10 p-4 rounded-xl border border-white/10">
            <div>
              <p className="text-white font-medium">Notifications</p>
              <p className="text-white/60 text-sm">Recevoir les alertes importantes</p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="notifications"
                checked={settings.notifications}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-gray-600 peer-checked:bg-blue-500 rounded-full transition-all"></div>
              <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></span>
            </label>
          </div>

          {/* Maintenance */}
          <div className="flex items-center justify-between bg-white/10 p-4 rounded-xl border border-white/10 mt-4">
            <div>
              <p className="text-white font-medium">Mode maintenance</p>
              <p className="text-white/60 text-sm">Rendre le site temporairement indisponible</p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="maintenance"
                checked={settings.maintenance}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-gray-600 peer-checked:bg-red-500 rounded-full transition-all"></div>
              <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></span>
            </label>
          </div>
        </div>

        {/* BOUTON */}
        <button
          type="submit"
          className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-full text-white font-semibold transition"
        >
          Sauvegarder les paramètres
        </button>
      </form>
    </motion.div>
  );
}
