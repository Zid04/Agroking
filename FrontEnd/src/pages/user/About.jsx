import { motion } from "framer-motion";
import {
  Leaf,
  ShieldCheck,
  Users,
  Fish,
  GraduationCap,
  Wrench,
  BarChart3,
  Wheat
} from "lucide-react";
import Tela from "../../assets/Tela.jpeg";
import Daniel from "../../assets/daniel.jpeg";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 }
  }
};

export default function AboutSection() {
  const teamMembers = [
    { name: "Tela Moyo ", role: "CEO & Fondateur", media: Tela },
    { name: "Ndong Efoua Loic", role: "Directeur Technique", media: Daniel },
    
  ];

  return (
    <section className="py-24 px-6 text-white">
      <div className="max-w-6xl mx-auto space-y-28">

        {/* ===== Qui sommes-nous ===== */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#0cf4e4]">
            Qui sommes-nous ?
          </h2>
          <p className="text-white/70 max-w-3xl mx-auto leading-relaxed">
            Agroking est une entreprise spécialisée dans la pisciculture moderne.
            Nous accompagnons les exploitants à travers des solutions complètes :
            formation, production, installation de fermes piscicoles et
            commercialisation de produits frais de qualité.
          </p>
        </motion.div>

        {/* ===== Nos valeurs ===== */}
        <div>
          <motion.h3
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 text-[#0cf4e4]"
          >
            Nos valeurs
          </motion.h3>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <ShieldCheck />, title: "Professionnalisme", desc: "Expertise et rigueur." },
              { icon: <Fish />, title: "Qualité", desc: "Produits frais garantis." },
              { icon: <Users />, title: "Engagement", desc: "Accompagnement responsable." },
              { icon: <Leaf />, title: "Durabilité", desc: "Respect de l’environnement." }
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="backdrop-blur-none p-6 rounded-2xl border border-white/10 text-center"
              >
                <div className="flex justify-center mb-4 text-[#0cf4e4] text-3xl">
                  {value.icon}
                </div>
                <h4 className="text-lg font-semibold mb-2">{value.title}</h4>
                <p className="text-white/70 text-sm">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ===== Nos services ===== */}
        <div>
          <motion.h3
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 text-[#0cf4e4]"
          >
            Nos services
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-10">
            {[
              { icon: <GraduationCap className="w-12 h-12" />, title: "Formation en pisciculture", desc: "Formation pratique et théorique pour exploitants.", img: "/services/formation.jpg" },
              { icon: <Fish className="w-12 h-12" />, title: "Production & vente d'alevins", desc: "Alevins de qualité et poissons frais.", img: "/services/alevins.jpg" },
              { icon: <Wrench className="w-12 h-12" />, title: "Installation de sites piscicoles", desc: "Fabrication et mise en place complète.", img: "/services/installation.jpg" },
              { icon: <BarChart3 className="w-12 h-12" />, title: "Outils de suivi de ferme", desc: "Optimisation et gestion de production.", img: "/services/outils.jpg" },
              { icon: <Wheat className="w-12 h-12" />, title: "Vente d'aliments", desc: "Aliments adaptés pour alevins et poissons.", img: "/services/aliments.jpg" }
            ].map((service, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-transparent rounded-2xl border border-white/10 overflow-hidden backdrop-blur-none transition-all duration-300"
              >
                <div className="w-full h-48 bg-gradient-to-br from-[#0cf4e4]/10 to-[#0889f3]/10 flex items-center justify-center relative overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute text-[#0cf4e4] opacity-50 drop-shadow-lg">
                    {service.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-3 text-white">{service.title}</h4>
                  <p className="text-white/70 text-sm leading-relaxed">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ===== Équipe ===== */}
        <div>
          <motion.h3
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 text-[#0cf4e4]"
          >
            Notre Équipe
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className=" backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center"
              >
                <img
                  src={member.media}
                  alt={member.name}
                  className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-2 border-[#0cf4e4]"
                />
                <h4 className="text-lg font-semibold">{member.name}</h4>
                <p className="text-white/70 text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
