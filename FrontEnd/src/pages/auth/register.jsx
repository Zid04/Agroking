import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/api"; 
import { useAuth } from "../../context/useAuth"; 

export default function Register() {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    password: "",
    tel: "" 
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const strongPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!strongPassword.test(formData.password)) {
      alert(
        "Mot de passe trop faible.\nIl doit contenir :\n- 8 caractères minimum\n- 1 majuscule\n- 1 chiffre\n- 1 caractère spécial"
      );
      return;
    }

    try {
      // ✔ CORRECTION ICI : plus de /api
      const res = await API.post("/auth/register", formData);

      const { token, user } = res.data;

      login(token, user, user.role);

      alert(`Compte créé avec succès pour ${user.name}`);
      navigate("/"); 

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Erreur lors de l'inscription");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/20 w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-blue-400 text-center">Inscription</h2>

        <div className="flex flex-col gap-1">
          <label className="text-white/70">Nom complet</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white"
            placeholder="John Doe"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-white/70">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white"
            placeholder="example@mail.com"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-white/70">Téléphone</label>
          <input
            type="text"
            name="tel"
            value={formData.tel}
            onChange={handleChange}
            required
            className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white"
            placeholder="+237690989098"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-white/70">Mot de passe</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white"
            placeholder="••••••••"
          />
        </div>

        <Button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-full transition"
        >
          S'inscrire
        </Button>

        <p className="text-white/60 text-center">
          Déjà inscrit ?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Connectez-vous
          </Link>
        </p>
      </form>
    </div>
  );
}
