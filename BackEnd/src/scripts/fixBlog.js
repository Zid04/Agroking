const mongoose = require("mongoose");
const Blog = require("../models/blog.model"); // ← chemin correct

async function run() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/agroking"); 
    console.log("Connecté à MongoDB");

    const blogs = await Blog.find();

    for (const blog of blogs) {
      let changed = false;

      // Si type = video mais mediaUrl vide → blog cassé
      if (blog.type === "video" && (!blog.mediaUrl || blog.mediaUrl === "")) {
        console.log("Blog cassé :", blog.title);

        // Mets ici ton ancien lien vidéo si tu le connais
        blog.mediaUrl = blog.mediaUrl || "A_REMPLIR_MANUELLEMENT";
        changed = true;
      }

      // Recalcul du type
      blog.type = blog.youtubeUrl
        ? "youtube"
        : blog.imageUrl
        ? "image"
        : blog.mediaUrl
        ? "video"
        : "image";

      if (changed) {
        await blog.save();
        console.log("Réparé :", blog.title);
      }
    }

    console.log("Réparation terminée");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
