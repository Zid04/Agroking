import React, { useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../../assets/logo.png";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Blog", href: "/blog" },
    { name: "Contacts", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full h-24 bg-transparent backdrop-blur-md z-50 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center py-2 px-4">

        {/* Logo */}
        <div className="cursor-pointer">
          <img src={Logo} alt="Logo" className="w-20 h-20" />
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-white hover:text-blue-400 transition"
              >
                {link.name}
              </a>
            </li>
          ))}

          <Separator orientation="vertical" className="bg-white/30 h-6 mx-2" />

          {/* Auth Buttons */}
          {!isLoggedIn ? (
            <>
              <li>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => (window.location.href = "/login")}
                >
                  Connexion
                </Button>
              </li>
              <li>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => (window.location.href = "/register")}
                >
                  Inscription
                </Button>
              </li>
            </>
          ) : (
            <li>
              <Button
                variant="destructive"
                size="sm"
                onClick={logout}
              >
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
            className="flex flex-col md:hidden bg-transparent backdrop-blur-md text-center space-y-4 py-4 px-6"
          >
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-white hover:text-purple-400 transition"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}

            {!isLoggedIn ? (
              <>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => {
                    window.location.href = "/login";
                    setMobileOpen(false);
                  }}
                >
                  Connexion
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    window.location.href = "/register";
                    setMobileOpen(false);
                  }}
                >
                  Inscription
                </Button>
              </>
            ) : (
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
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
