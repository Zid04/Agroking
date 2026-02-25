import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, PlayCircle } from "lucide-react";
import API from "../../api/api";

// Animation au scroll
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

export default function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const [playingIndex, setPlayingIndex] = useState(null);
  const videoRefs = useRef([]);

  // Charger les blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get("/api/blogs");
        setBlogs(res.data);
      } catch (err) {
        console.error("Erreur récupération blogs :", err);
      }
    };
    fetchBlogs();
  }, []);

  // Lecture / pause vidéo
  const toggleVideo = (index) => {
    const currentVideo = videoRefs.current[index];
    if (!currentVideo) return;

    // Pause toutes les autres vidéos
    videoRefs.current.forEach((video, i) => {
      if (video && i !== index) video.pause();
    });

    // Toggle lecture
    if (playingIndex === index) {
      currentVideo.pause();
      setPlayingIndex(null);
    } else {
      currentVideo.play();
      setPlayingIndex(index);
    }
  };

  // Détection automatique du type si manquant
  const detectType = (blog) => {
    if (blog.type) return blog.type;

    if (blog.youtubeUrl) return "youtube";
    if (blog.mediaUrl) return "video";
    if (blog.imageUrl) return "image";

    return "image"; // fallback
  };

  return (
    <section className="w-full bg-black py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* ===== Titre ===== */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#0cf4e4]">
            Actualités & Vidéos
          </h2>
          <p className="text-white/70 mt-4 max-w-2xl mx-auto">
            Découvrez nos conseils, formations et innovations en pisciculture ainsi que nos produits frais.
          </p>
        </motion.div>

        {/* ===== Grid ===== */}
        <div className="grid md:grid-cols-3 gap-10">

          {blogs.map((blog, index) => {
            const type = detectType(blog);

            return (
              <motion.div
                key={blog._id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                whileHover={{ y: -10 }}
                className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10"
              >
                <div className="relative h-52 w-full overflow-hidden cursor-pointer">

                  {/* === VIDEO LOCALE === */}
                  {(type === "video" && blog.mediaUrl) && (
                    <div onClick={() => toggleVideo(index)}>
                      <video
                        ref={(el) => (videoRefs.current[index] = el)}
                        src={blog.mediaUrl}
                        className="h-full w-full object-cover"
                        loop
                        playsInline
                      />
                      {playingIndex !== index && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                          <PlayCircle size={50} className="text-white" />
                        </div>
                      )}
                    </div>
                  )}

                  {/* === VIDEO YOUTUBE === */}
                  {(type === "youtube" && blog.youtubeUrl) && (
                    <iframe
                      className="h-full w-full object-cover"
                      src={blog.youtubeUrl.replace("watch?v=", "embed/")}
                      title={blog.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}

                  {/* === IMAGE === */}
                  {(type === "image" && blog.imageUrl) && (
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="h-full w-full object-cover"
                    />
                  )}

                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center text-sm text-white/60 gap-2">
                    <Calendar size={16} />
                    {blog.date}
                  </div>
                  <h3 className="text-xl font-semibold">{blog.title}</h3>
                  <p className="text-white/70 text-sm">{blog.content}</p>
                </div>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
