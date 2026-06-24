require("dotenv").config();
const mongoose = require("mongoose");
const Blog = require("../models/blog.model");

const urlMap = {
  "blog1.mp4":  "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256465/blog1_igno2u.mp4",
  "blog2.mp4":  "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256465/blog2_zkhuxx.mp4",
  "blog3.mp4":  "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256465/blog3_y9qver.mp4",
  "blog4.mp4":  "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256466/blog4_ffn3mj.mp4",
  "blog5.mp4":  "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256466/blog5_jbofpv.mp4",
  "blog6.mp4":  "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256469/blog6_dl8dwk.mp4",
  "blog7.mp4":  "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256471/blog7_lfuvti.mp4",
  "blog8.mp4":  "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256472/blog8_wvkgvl.mp4",
  "blog9.mp4":  "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256473/blog9_th1quz.mp4",
  "blog10.mp4": "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256469/blog10_ttzpvs.mp4",
  "blog11.mp4": "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256470/blog11_xhreei.mp4",
  "blog12.mp4": "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256478/blog12_jw1qzm.mp4",
  "blog13.mp4": "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256457/blog13_j0t2av.mp4",
  "blog14.mp4": "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256461/blog14_a6uniq.mp4",
  "blog15.mp4": "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256462/blog15_wp5m2e.mp4",
  "blog16.mp4": "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256459/blog16_b4jkhh.mp4",
  "blog17.mp4": "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256466/blog17_jlxzm8.mp4",
  "blog18.mp4": "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256463/blog18_hqsyzj.mp4",
  "blog19.mp4": "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256463/blog19_zaolyr.mp4",
  "blog20.mp4": "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256462/blog20_ztxsxs.mp4",
  "blog21.mp4": "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256466/blog21_kpyacg.mp4",
  "blog22.mp4": "https://res.cloudinary.com/dkv7cnmaa/video/upload/v1782256412/blog22_eenntc.mp4",
};

async function migrate() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connexion MongoDB OK");

  const blogs = await Blog.find({ mediaUrl: /supabase/ });
  console.log(`${blogs.length} blogs avec URLs Supabase trouvés`);

  for (const blog of blogs) {
    const fileName = blog.mediaUrl.split("/").pop();
    const newUrl = urlMap[fileName];

    if (!newUrl) {
      console.log(`⚠ Pas de correspondance pour : ${blog.mediaUrl}`);
      continue;
    }

    blog.mediaUrl = newUrl;
    await blog.save();
    console.log(`✔ Migré : ${fileName}`);
  }

  console.log("Migration terminée !");
  process.exit();
}

migrate();
