const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../services/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "agroking_blogs",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const uploadBlog = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }
}).single("image"); 

module.exports = (req, res, next) => {
  uploadBlog(req, res, function (err) {
    if (err) {
      console.error("ERREUR MULTER/CLOUDINARY BLOG :", err);
      return res.status(500).json({ message: "Erreur upload blog", error: err });
    }
    next();
  });
};
