const express = require("express");
const {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
} = require("../controllers/blog.controller");

const auth = require("../middlewares/auth.middleware");
const adminAuth = require("../middlewares/admin.middleware");
const uploadBlog = require("../middlewares/uploadBlog");

const router = express.Router();

// PUBLIC
router.get("/", getBlogs);
router.get("/:id", getBlogById);

// ADMIN
router.post("/", auth, adminAuth, uploadBlog, createBlog);
router.put("/:id", auth, adminAuth, uploadBlog, updateBlog);
router.delete("/:id", auth, adminAuth, deleteBlog);

module.exports = router;
