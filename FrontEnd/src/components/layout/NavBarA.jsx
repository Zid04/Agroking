import React, { useState } from "react";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";

function NavbarAdmin() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const links = [
    { name: "Tableau de bord", href: "/admin" },
    { name: "Gestion de Produit", href: "/admin/productmanagement" },
    { name: "Commande", href: "/admin/order" },
    { name: "Clients", href: "/admin/user" },
    { name: "Blog", href: "/admin/blogA" },
    { name: "Paramètres", href: "/admin/settings" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full h-24 bg-transparent backdrop-blur-md z-50 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center py-2 px-4">

        {/* Logo */}
        <Link to="/admin" className="cursor-pointer">
          <img src={Logo} alt="Logo" className="w-20 h-20" />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className="text-white hover:text-purple-400 transition"
              >
                {link.name}
              </Link>
            </li>
          ))}

          <div className="w-px h-6 bg-white/30 mx-2"></div>

          {!isLoggedIn ? (
            <>
              <li>
                <Link to="/login">
                  <Button variant="default" size="sm">
                    Connexion
                  </Button>
                </Link>
              </li>

              <li>
                <Link to="/register">
                  <Button variant="outline" size="sm">
                    Inscription
                  </Button>
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Button variant="destructive" size="sm" onClick={logout}>
                Déconnexion
              </Button>
            </li>
          )}
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            className="text-white text-2xl"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex flex-col md:hidden bg-black/80 backdrop-blur-md text-center space-y-4 py-6 px-6"
          >
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="text-white hover:text-purple-400 transition"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            {!isLoggedIn ? (
              <>
                <li>
                  <Link to="/login" onClick={() => setMobileOpen(false)}>
                    <Button variant="default" size="sm">
                      Connexion
                    </Button>
                  </Link>
                </li>

                <li>
                  <Link to="/register" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" size="sm">
                      Inscription
                    </Button>
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                >
                  Déconnexion
                </Button>
              </li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default NavbarAdmin;
