const mongoose = require("mongoose");
const Product = require("../models/productmanagement.model");
require("dotenv").config();

const products = [
  { name: "Alevins de Tilapia", category: "Production", price: 10000, media: "alevinsTilapia.jpg" },
  { name: "Alevins de silure", category: "Production", price: 12000, media: "alevinsSilure.jpg" },
  { name: "Alevins de kanga", category: "Production", price: 15000, media: "alevinsKanga.jpg" },
  { name: "alevins de carpes", category: "Production", price: 10000, media: "alevinsCarpes.webp" },
  { name: "Aliments", category: "Alimentation", price: 20000, media: "aliment.jpg" },
  { name: "Installation de site piscicole", category: "Infrastructure", price: 0, media: "installation.gif" },
  { name: "moyenne cuve", category: "Outils", price: 20000, media: "cuve3.jpg" },
  { name: "grande cuve", category: "Outils", price: 0, media: "cuve.jpg" },
  { name: "Système de filtration", category: "Infrastructure", price: 50000, media: "filtrage.jpg" },
  { name: "Pompes à eau", category: "Outils", price: 40000, media: "pompe.jpg" },
  { name: "installation, Suivi et gestion de l’élevage", category: "Formation", price: 0, media: "suivi.webp" },
  { name: "epuisette", category: "Outils", price: 5000, media: "epuisette.jpg" },
  { name: "epuisette1", category: "Outils", price: 8000, media: "epuisette1.jpeg" },
  { name: "epuisette3", category: "Outils", price: 8000, media: "epuisette2.webp" },
  { name: "poisson carpe", category: "Production", price: 2500, media: "carpes.png" },
  { name: "poisson vipere", category: "Production", price: 3000, media: "vipere.jpg" },
  { name: "poisson silure", category: "Production", price: 3000, media: "silure.jpg" },
  { name: "poisson kanga", category: "Production", price: 6000, media: "kanga.jpg" },
  { name: "Poissons Tilapia", category: "Production", price: 2500, media: "tilapia.jpg" },
  { name: "Grande carpe", category: "Production", price: 4500, media: "Gcarpe.jpg" },
  { name: "Grand Tilapia", category: "Production", price: 4500, media: "Gtilapia.jpg" },
  { name: "Grand Silure", category: "Production", price: 5000, media: "silures.jpg" },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");

    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("Produits importés avec succès !");
    process.exit();
  })
  .catch((err) => console.error(err));
