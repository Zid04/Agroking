const Blog = require("../models/blog.model");

// GET /api/blogs
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch {
    res.status(500).json({ error: "Erreur récupération blogs" });
  }
};

// GET /api/blogs/:id
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog introuvable" });
    res.json(blog);
  } catch {
    res.status(500).json({ error: "Erreur récupération blog" });
  }
};

// POST /api/blogs
exports.createBlog = async (req, res) => {
  try {
    const { title, content, youtubeUrl, mediaUrl, type, date } = req.body;

    const imageUrl = req.file ? req.file.path : "";

    const newBlog = new Blog({
      title,
      content,
      youtubeUrl,
      mediaUrl,
      imageUrl,
      type: type || (youtubeUrl ? "youtube" : imageUrl ? "image" : "video"),
      date: date || new Date().getFullYear()
    });

    await newBlog.save();
    res.status(201).json(newBlog);

  } catch {
    res.status(500).json({ error: "Erreur création blog" });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, youtubeUrl, mediaUrl, type, date } = req.body;

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ error: "Blog introuvable" });

    // Mise à jour uniquement des champs envoyés
    if (title !== undefined) blog.title = title;
    if (content !== undefined) blog.content = content;

    // Ne PAS écraser les URLs si elles sont vides
    if (youtubeUrl !== undefined && youtubeUrl !== "") {
      blog.youtubeUrl = youtubeUrl;
    }

    if (mediaUrl !== undefined && mediaUrl !== "") {
      blog.mediaUrl = mediaUrl;
    }

    // Image Cloudinary
    if (req.file) blog.imageUrl = req.file.path;

    // Type intelligent
    if (type !== undefined && type !== "") {
      blog.type = type;
    } else {
      blog.type = blog.youtubeUrl
        ? "youtube"
        : blog.imageUrl
        ? "image"
        : blog.mediaUrl
        ? "video"
        : blog.type;
    }

    if (date !== undefined) blog.date = date;

    await blog.save();
    res.json(blog);

  } catch (err) {
    console.error("Erreur updateBlog :", err);
    res.status(500).json({ error: "Erreur modification blog" });
  }
};


// DELETE /api/blogs/:id
exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog supprimé avec succès" });
  } catch {
    res.status(500).json({ error: "Erreur suppression blog" });
  }
};
