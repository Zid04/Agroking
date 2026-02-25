import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

export default function HeroSection() {
  const [heroVideoUrl, setHeroVideoUrl] = useState("");

  useEffect(() => {
    // Récupère l'URL publique de la vidéo depuis Supabase
    const { data } = supabase.storage.from("Images").getPublicUrl("Hero.mp4");
    if (data && data.publicUrl) {
      setHeroVideoUrl(data.publicUrl);
    }
  }, []);

  return (
    <section className="relative w-screen h-screen overflow-hidden">
      {/* 🎥 Background Video */}
      {heroVideoUrl && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src={heroVideoUrl} type="video/mp4" />
        </video>
      )}

      {/* Overlay — rendu transparent pour laisser le background visible */}
      <div className="absolute inset-0 bg-transparent"></div>

      {/* Contenu centré */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 max-w-4xl mx-auto text-white">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
        >
          Optimisez votre production, valorisez votre exploitation et offrez vous des produits frais d’exception grâce à Agroking.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex gap-6 pt-8 flex-wrap justify-center"
        >
          <Link to="/products">
            <Button   variant="outline" className="rounded-full px-8 py-3  hover:text-black">
              Nos Produits
            </Button>
          </Link>

          <Link to="/contact">
            <Button
              variant="outline"
              className="rounded-full px-8 py-3 border-white text-white hover:bg-white hover:text-black"
            >
              Qui sommes-nous?
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
