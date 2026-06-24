require("dotenv").config();
const mongoose = require("mongoose");
const Blog = require("../models/blog.model");

const videos = [
  { title: "Agroking 1",  content: "Plus qu'un travail c'est une passion", date: "2025", mediaUrl: "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256465/blog1_igno2u.mp4" },
  { title: "Agroking 2",  content: "Plus qu'un travail c'est une passion", date: "2025", mediaUrl: "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256465/blog2_zkhuxx.mp4" },
  { title: "Agroking 3",  content: "Plus qu'un travail c'est une passion", date: "2025", mediaUrl: "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256465/blog3_y9qver.mp4" },
  { title: "Agroking 4",  content: "Plus qu'un travail c'est une passion", date: "2025", mediaUrl: "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256466/blog4_ffn3mj.mp4" },
  { title: "Agroking 5",  content: "Plus qu'un travail c'est une passion", date: "2025", mediaUrl: "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256466/blog5_jbofpv.mp4" },
  { title: "Agroking 6",  content: "Plus qu'un travail c'est une passion", date: "2025", mediaUrl: "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256469/blog6_dl8dwk.mp4" },
  { title: "Agroking 7",  content: "Plus qu'un travail c'est une passion", date: "2025", mediaUrl: "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256471/blog7_lfuvti.mp4" },
  { title: "Agroking 8",  content: "Plus qu'un travail c'est une passion", date: "2025", mediaUrl: "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256472/blog8_wvkgvl.mp4" },
  { title: "Agroking 9",  content: "Plus qu'un travail c'est une passion", date: "2025", mediaUrl: "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256473/blog9_th1quz.mp4" },
  { title: "Agroking 10", content: "Plus qu'un travail c'est une passion", date: "2025", mediaUrl: "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256469/blog10_ttzpvs.mp4" },
  { title: "Agroking 11", content: "Plus qu'un travail c'est une passion", date: "2025", mediaUrl: "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256470/blog11_xhreei.mp4" },
  { title: "Agroking 12", content: "Plus qu'un travail c'est une passion", date: "2025", mediaUrl: "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256478/blog12_jw1qzm.mp4" },
  { title: "Agroking 13", content: "Plus qu'un travail c'est une passion", date: "2025", mediaUrl: "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256457/blog13_j0t2av.mp4" },
  { title: "Agroking 14", content: "Plus qu'un travail c'est une passion", date: "2025", mediaUrl: "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256461/blog14_a6uniq.mp4" },
  { title: "Agroking 15", content: "Plus qu'un travail c'est une passion", date: "2025", mediaUrl: "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256462/blog15_wp5m2e.mp4" },
  { title: "Agroking 16", content: "Plus qu'un travail c'est une passion", date: "2025", mediaUrl: "" },
  { title: "Agroking 17", content: "Plus qu'un travail c'est une passion", date: "2025", mediaUrl: "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256466/blog17_jlxzm8.mp4" },
  { title: "Agroking 18", content: "Plus qu'un travail c'est une passion", date: "2025", mediaUrl: "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256463/blog18_hqsyzj.mp4" },
  { title: "Agroking 19", content: "Plus qu'un travail c'est une passion", date: "2025", mediaUrl: "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256463/blog19_zaolyr.mp4" },
  { title: "Agroking 20", content: "Plus qu'un travail c'est une passion", date: "2025", mediaUrl: "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256462/blog20_ztxsxs.mp4" },
  { title: "Agroking 21", content: "Plus qu'un travail c'est une passion", date: "2025", mediaUrl: "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256466/blog21_kpyacg.mp4" },
  { title: "Agroking 22", content: "Plus qu'un travail c'est une passion", date: "2025", mediaUrl: "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256412/blog22_eenntc.mp4" },
];

async function importVideos() {
  await mongoose.connect(process.env.MONGO_URI);

  console.log("Importation des vidéos...");

  for (const vid of videos) {
    if (!vid.mediaUrl) {
      console.log(`⚠ URL manquante pour : ${vid.title}`);
      continue;
    }

    await Blog.create({
      title: vid.title,
      content: vid.content,
      mediaUrl: vid.mediaUrl,
      type: "video",
      date: vid.date
    });

    console.log(`✔ Vidéo importée : ${vid.title}`);
  }

  console.log("Import terminé !");
  process.exit();
}

importVideos();
