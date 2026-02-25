import React from "react";
import { Separator } from "../ui/separator";

function Footer() {
  return (
    <footer className="bg-transparent backdrop-blur-md text-white py-8 px-6 mt-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">

        {/* Liens sociaux */}
        <div className="flex space-x-6">
          <a href="https://tiktok.com/@tela.moyo" target="_blank" rel="noreferrer" className="hover:text-blue-300 transition">TikTok</a>
          <a href="https://facebook.com/tela.moyo.2025" target="_blank" rel="noreferrer" className="hover:text-blue-300 transition">Facebook</a>
          <a href="https://wa.me/+237699167890" target="_blank" rel="noreferrer" className="hover:text-blue-300 transition">WhatsApp</a>
        </div>

      </div>

      {/* Separator */}
      <Separator className="my-6 bg-white/20" />

      {/* Copyright */}
      <p className="text-center text-white/70 text-sm">
        © {new Date().getFullYear()} Agroking. tous droits réservés.
      </p>
    </footer>
  );
}

export default Footer;
