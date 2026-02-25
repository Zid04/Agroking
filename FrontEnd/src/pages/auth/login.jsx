import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/api";
import { useAuth } from "../../context/useAuth";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const res = await API.post("/auth/login", formData);

      const { token, user } = res.data;

      login(token, user, user.role);

      alert(`Vous êtes connecté en tant que ${user.email}`);

      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Erreur lors de la connexion");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/20 w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-cyan-400 text-center">Connexion</h2>

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
          className="w-full py-3 bg-purple-600 hover:bg-cyan-700 rounded-full transition"
        >
          Se connecter
        </Button>

        <p className="text-white/60 text-center">
          Pas encore inscrit ?{" "}
          <Link to="/register" className="text-cyan-400 hover:underline">
            Créez un compte
          </Link>
        </p>
      </form>
    </div>
  );
}
