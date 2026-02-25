require("dotenv").config();
const mongoose = require("mongoose");
const Blog = require("../models/blog.model");

// Fonction pour générer l’URL publique Supabase
const getPublicUrl = (filePath) => {
  return `${process.env.SUPABASE_URL}/storage/v1/object/public/Images/${filePath}`;
};

// === LISTE DES VIDÉOS AVEC TITRE, DESCRIPTION, DATE PERSONNALISABLES ===
const videos = [
  { title: "Agroking 1", content: "Plus qu'un travail c'est une passion", date: "2025", file: "blog1.mp4" },
  { title: "Agroking 2", content: "Plus qu'un travail c'est une passion", date: "2025", file: "blog2.mp4" },
  { title: "Agroking 3", content: "Plus qu'un travail c'est une passion", date: "2025", file: "blog3.mp4" },
  { title: "Agroking 4", content: "Plus qu'un travail c'est une passion", date: "2025", file: "blog4.mp4" },
  { title: "Agroking 5", content: "Plus qu'un travail c'est une passion", date: "2025", file: "blog5.mp4" },
  { title: "Agroking 6", content: "Plus qu'un travail c'est une passion", date: "2025", file: "blog6.mp4" },
  { title: "Agroking 7", content: "Plus qu'un travail c'est une passion", date: "2025", file: "blog7.mp4" },
  { title: "Agroking 8", content: "Plus qu'un travail c'est une passion", date: "2025", file: "blog8.mp4" },
  { title: "Agroking 9", content: "Plus qu'un travail c'est une passion", date: "2025", file: "blog9.mp4" },
  { title: "Agroking 10", content: "Plus qu'un travail c'est une passion", date: "2025", file: "blog10.mp4" },
  { title: "Agroking 11", content: "Plus qu'un travail c'est une passion", date: "2025", file: "blog11.mp4" },
  { title: "Agroking 12", content: "Plus qu'un travail c'est une passion", date: "2025", file: "blog12.mp4" },
  { title: "Agroking 13", content: "Plus qu'un travail c'est une passion", date: "2025", file: "blog13.mp4" },
  { title: "Agroking 14", content: "Plus qu'un travail c'est une passion", date: "2025", file: "blog14.mp4" },
  { title: "Agroking 15", content: "Plus qu'un travail c'est une passion", date: "2025", file: "blog15.mp4" },
  { title: "Agroking 16", content: "Plus qu'un travail c'est une passion", date: "2025", file: "blog16.mp4" },
  { title: "Agroking 17", content: "Plus qu'un travail c'est une passion", date: "2025", file: "blog17.mp4" },
  { title: "Agroking 18", content: "Plus qu'un travail c'est une passion", date: "2025", file: "blog18.mp4" },
  { title: "Agroking 19", content: "Plus qu'un travail c'est une passion", date: "2025", file: "blog19.mp4" },
  { title: "Agroking 20", content: "Plus qu'un travail c'est une passion", date: "2025", file: "blog20.mp4" },
  { title: "Agroking 21", content: "Plus qu'un travail c'est une passion", date: "2025", file: "blog21.mp4" },
  { title: "Agroking 22", content: "Plus qu'un travail c'est une passion", date: "2025", file: "blog22.mp4" }
];


// === IMPORT AUTOMATIQUE ===
async function importVideos() {
  await mongoose.connect(process.env.MONGO_URI);

  console.log("📦 Importation des vidéos locales...");

  for (const vid of videos) {
    const mediaUrl = getPublicUrl(vid.file);

    await Blog.create({
      title: vid.title,
      content: vid.content,
      mediaUrl,
      type: "video",
      date: vid.date
    });

    console.log(`✔ Vidéo importée : ${vid.title}`);
  }

  console.log("🎉 Import terminé !");
  process.exit();
}

importVideos();
