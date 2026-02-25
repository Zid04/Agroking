import { useState, useEffect } from "react";
import API from "../../api/api";
import { toast } from "react-hot-toast";

export default function BlogAdmin() {
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    content: "",
    youtubeUrl: "",
    mediaUrl: "",
    type: "",
    date: "",
    imageFile: null,
    imageUrl: ""
  });

  // Charger les blogs
  const fetchBlogs = async () => {
    try {
      const res = await API.get("/api/blogs");
      setBlogs(res.data);
    } catch {
      toast.error("Erreur récupération blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Gestion des inputs
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setForm((prev) => ({ ...prev, imageFile: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Remplir le formulaire pour modifier
  const startEdit = (blog) => {
    setEditingId(blog._id);
    setForm({
      title: blog.title || "",
      content: blog.content || "",
      youtubeUrl: blog.youtubeUrl || "",
      mediaUrl: blog.mediaUrl || "",
      type: blog.type || "",
      date: blog.date || "",
      imageFile: null,
      imageUrl: blog.imageUrl || ""
    });
  };

  // Reset
  const resetForm = () => {
    setEditingId(null);
    setForm({
      title: "",
      content: "",
      youtubeUrl: "",
      mediaUrl: "",
      type: "",
      date: "",
      imageFile: null,
      imageUrl: ""
    });
  };

  // Soumission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();

      // Ajouter uniquement les champs non vides
      Object.entries(form).forEach(([key, value]) => {
        if (value && key !== "imageUrl") {
          if (key === "imageFile") payload.append("image", value);
          else payload.append(key, value);
        }
      });

      if (editingId) {
        await API.put(`/api/blogs/${editingId}`, payload);
        toast.success("Article modifié !");
      } else {
        await API.post("/api/blogs", payload);
        toast.success("Article publié !");
      }

      resetForm();
      fetchBlogs();

    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de l'enregistrement.");
    }
  };

  // Supprimer
  const deleteBlog = async (id) => {
    if (!confirm("Supprimer cet article ?")) return;

    try {
      await API.delete(`/api/blogs/${id}`);
      toast.success("Article supprimé");
      fetchBlogs();
    } catch {
      toast.error("Erreur suppression");
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">

      <h1 className="text-3xl font-bold text-cyan-500 mb-8">
        Gestion des Blogs
      </h1>

      {/* LISTE DES BLOGS */}
      <div className="space-y-4 mb-12">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white/5 border border-white/10 p-4 rounded-xl"
          >
            {editingId === blog._id ? (
              // MODE ÉDITION INLINE
              <form onSubmit={handleSubmit} className="space-y-3">

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-white/10 text-white"
                />

                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-white/10 text-white"
                  rows={3}
                />

                <input
                  type="url"
                  name="youtubeUrl"
                  value={form.youtubeUrl}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-white/10 text-white"
                  placeholder="Lien YouTube"
                />

                <input
                  type="url"
                  name="mediaUrl"
                  value={form.mediaUrl}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-white/10 text-white"
                  placeholder="Lien vidéo"
                />

                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-white/10 text-white"
                >
                  <option value="">Auto</option>
                  <option value="image">Image</option>
                  <option value="youtube">YouTube</option>
                  <option value="video">Vidéo</option>
                </select>

                <input
                  type="number"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-white/10 text-white"
                  placeholder="Année"
                />

                {form.imageUrl && !form.imageFile && (
                  <img
                    src={form.imageUrl}
                    className="w-32 rounded"
                  />
                )}

                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="text-white"
                />

                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-green-600 rounded text-white">
                    Enregistrer
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 bg-gray-600 rounded text-white"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            ) : (
              // MODE LECTURE
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white font-semibold">{blog.title}</p>
                  <p className="text-white/60 text-sm">{blog.date}</p>
                  <p className="text-white/50 text-xs mt-1 line-clamp-2">
                    {blog.content}
                  </p>

                  {blog.youtubeUrl && (
                    <p className="text-cyan-400 text-xs mt-1">
                      🎥 YouTube : {blog.youtubeUrl}
                    </p>
                  )}

                  {blog.mediaUrl && (
                    <p className="text-purple-400 text-xs mt-1">
                      📹 Vidéo : {blog.mediaUrl}
                    </p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => startEdit(blog)}
                    className="px-3 py-1 bg-blue-500 rounded text-white"
                  >
                    Modifier
                  </button>

                  <button
                    onClick={() => deleteBlog(blog._id)}
                    className="px-3 py-1 bg-red-500 rounded text-white"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* FORMULAIRE AJOUT */}
      {editingId === null && (
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white/5 p-6 rounded-xl border border-white/10"
        >
          <h2 className="text-xl font-bold text-cyan-400">Ajouter un article</h2>

          <input
            type="text"
            name="title"
            placeholder="Titre"
            value={form.title}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded bg-white/10 text-white"
          />

          <textarea
            name="content"
            placeholder="Description"
            value={form.content}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded bg-white/10 text-white"
            rows={4}
          />

          <input
            type="url"
            name="youtubeUrl"
            placeholder="Lien YouTube"
            value={form.youtubeUrl}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded bg-white/10 text-white"
          />

          <input
            type="url"
            name="mediaUrl"
            placeholder="Lien Vidéo"
            value={form.mediaUrl}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded bg-white/10 text-white"
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="text-white"
          />

          <button className="w-full py-3 bg-cyan-500 rounded text-white">
            Publier
          </button>
        </form>
      )}
    </div>
  );
}
