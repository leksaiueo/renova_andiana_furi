import { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Heart,
  Camera,
  Cat,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// --- Data & Assets ---
const GALLERY_IMAGES = [
  {
    id: 1,
    url: "/assets/a.webp",
    title: "Morning Cuddles",
  },
  {
    id: 2,
    url: "/assets/y.jpg",
    title: "Sleepy Head",
  },
  {
    id: 3,
    url: "/assets/c.webp",
    title: "Basket Case",
  },
  {
    id: 4,
    url: "/assets/d.jpg",
    title: "Triple Trouble",
  },
  {
    id: 5,
    url: "/assets/e.webp",
    title: "Flower Power",
  },
  {
    id: 6,
    url: "/assets/f.jpg",
    title: "Sofa King Cute",
  },
  {
    id: 7,
    url: "/assets/g.webp",
    title: "Tiny Paws",
  },
  {
    id: 8,
    url: "/assets/h.jpg",
    title: "Curious Eyes",
  },
  {
    id: 9,
    url: "/assets/i.webp",
    title: "Snowball",
  },
  {
    id: 10,
    url: "/assets/j.jpg",
    title: "Little Tiger",
  },
  {
    id: 11,
    url: "/assets/k.jpg",
    title: "Wild & Free",
  },
  {
    id: 12,
    url: "/assets/l.jpg",
    title: "Moonlight Dreams",
  },
  {
    id: 13,
    url: "/assets/t.jpg",
    title: "Blooming Love",
  },
  {
    id: 14,
    url: "/assets/n.jpg",
    title: "Nature's Touch",
  },
  {
    id: 15,
    url: "/assets/o.jpg",
    title: "Cozy Nap",
  },
  {
    id: 16,
    url: "/assets/v.jpg",
    title: "Baby Blue",
  },
  {
    id: 17,
    url: "/assets/q.jpg",
    title: "Whiskers",
  },
  {
    id: 18,
    url: "/assets/r.jpg",
    title: "Pink Petals",
  },
];

const MUSIC_TRACKS = [
  {
    id: 1,
    src: "https://open.spotify.com/embed/album/3mhNiz8ZMZHOmqZl04LPR0",
    title: "Yungkai - Blue",
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    text: "You make every day brighter just by being you.",
    author: "Pacar Tersayangmu",
  },
  {
    id: 2,
    text: "The kindest soul with the warmest heart.",
    author: "Pacar Tergantengmu",
  },
  {
    id: 3,
    text: "Your smile is my favorite thing in the world.",
    author: "Pacar Terfavoritmu",
  },
  {
    id: 4,
    text: "Having you in my life feels like having my favorite song on repeat forever.",
    author: "Pacar Terbaikmu",
  },
  {
    id: 5,
    text: "You're not just part of my life—you're the best part.",
    author: "Pacar Terimutumu",
  },
  {
    id: 6,
    text: "You make the world easier to handle just by existing.",
    author: "Pacar Terhebatmu",
  },
];

const BLOG_POSTS = [
  {
    id: 1,
    title: "Senja dan Kamu",
    excerpt: "Di antara jingga yang memudar, wajahmu abadi.",
    date: "Nov 28, 2025",
    content:
      "Langit merona memeluk petang,\nRindu padamu kian menerjang.\nSenja berlalu tinggalkan bayang,\nNamun cintaku takkan menghilang.\nKaulah puisi yang tak usai kutulis,\nDalam setiap detak, namamu terlukis.",
  },
  {
    id: 2,
    title: "Bintang Penunjuk Arah",
    excerpt: "Kaulah cahaya di tengah gelapnya malamku.",
    date: "Nov 28, 2025",
    content:
      "Di luas samudra kehidupan,\nAku terombang-ambing tanpa tujuan.\nHingga kau hadir sebagai bintang,\nMembawa terang, menghapus bimbang.\nBersamamu, arahku pasti,\nMenuju dermaga cinta yang abadi.",
  },
  {
    id: 3,
    title: "Rumah",
    excerpt: "Bukan tempat, melainkan seseorang.",
    date: "Nov 28, 2025",
    content:
      "Aku lelah mencari tempat berteduh,\nHingga kutemukan hatimu yang teduh.\nTak perlu megah, tak perlu mewah,\nCukup kasihmu yang tak pernah goyah.\nDi pelukmu, aku pulang,\nSegala resah pun hilang.",
  },
  {
    id: 4,
    title: "Melodi Hati",
    excerpt: "Setiap detak adalah nada untukmu.",
    date: "Nov 28, 2025",
    content:
      "Dalam hening malam yang syahdu,\nTerdengar lirih nyanyian rindu.\nBukan dari bibir yang berucap,\nMelainkan hati yang berharap.\nAgar kau dengar melodi ini,\nTentang cinta yang takkan mati.",
  },
  {
    id: 5,
    title: "Jejak Langkah",
    excerpt: "Bersamamu, setiap langkah adalah petualangan.",
    date: "Nov 28, 2025",
    content:
      "Kita berjalan di atas bumi yang sama,\nMengukir kisah dalam setiap masa.\nJejak kakimu dan jejak kakiku,\nMenyatu dalam irama waktu.\nTak peduli seberapa jauh perjalanan,\nAsal bersamamu, itu tujuan.",
  },
  {
    id: 6,
    title: "Pelangi Setelah Hujan",
    excerpt: "Kau adalah warna dalam hidupku.",
    date: "Nov 28, 2025",
    content:
      "Saat badai datang menerpa,\nKau hadir tanpa banyak sapa.\nMembawa warna di langit kelabu,\nMenghapus sedih, mengusir ragu.\nKaulah pelangi yang kunanti,\nIndah, nyata, dan berarti.",
  },
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Gallery", href: "#gallery" },
    { name: "Little Poetry", href: "#blog" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--color-soft-pink)] backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a
          href="#"
          className="text-2xl font-serif font-bold text-soft-text flex items-center gap-2"
        >
          <Cat className={isScrolled ? "text-white" : "text-soft-text"} />
          <span className={isScrolled ? "text-white" : "text-soft-text"}>
            RENOVA ANDIANA FURI
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`font-medium hover:text-white transition-colors ${
                isScrolled ? "text-white/90" : "text-soft-text"
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="text-soft-text" />
          ) : (
            <Menu className={isScrolled ? "text-white" : "text-soft-text"} />
          )}
        </button>
      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-soft-pink/20 overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-soft-text font-medium hover:text-soft-pink"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-landingpage"
    >
      {/* Background Elements */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 left-10 w-64 h-64 bg-[var(--color-soft-pink)]/30 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-soft-lavender/40 rounded-full blur-3xl"
      />
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-soft-text mb-6">
            Happy Birthday 22th,{" "}
            <span className="text-soft-accent">Sayangkuu ❤️</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-5xl mx-auto">
            Aku nggak tahu gimana hidupku sebelum ketemu sayang, tapi yang jelas
            sekarang semuanya lebih indah karena ada sayang. Hari ini makin
            cantik, makin lucu, dan makin bikin aku nggak mau jauh-jauh dari
            sayang. ILYSM ❤️ Sayangkuu, dan semoga apa yang diinginkan sayang
            tercapai apapun itu ya...✨
          </p>
          <motion.a
            href="#gallery"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-[var(--color-soft-pink)] text-white px-8 py-3 rounded-full font-medium shadow-lg hover:bg-soft-accent transition-colors"
          >
            <Heart className="w-5 h-5 fill-current" />
            Coba Scroll ke Bawah
            <Heart className="w-5 h-5 fill-current" />
          </motion.a>
        </motion.div>
      </div>
      {/* Floating Cat Icon */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-soft-pink/50"
      >
        <Cat className="w-12 h-12" />
      </motion.div>
    </section>
  );
};

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-20 bg-landingpage">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl font-serif font-bold text-soft-text mb-4"
            style={{
              fontSize: "36px",
            }}
          >
            Our Memories
          </h2>
          <div className="w-20 h-1 bg-[var(--color-soft-pink)] mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GALLERY_IMAGES.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer shadow-md"
              onClick={() => setSelectedImage(img.url)}
            >
              <a
                href="https://drive.google.com/file/d/1EhEOPg9-CpXyneBLzJeAvkFtlQK2KdYn/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </a>
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Camera className="text-white w-8 h-8" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage}
              alt="Selected"
              className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
            />
            <button className="absolute top-4 right-4 text-white p-2">
              <X className="w-8 h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () =>
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
    );

  return (
    <section className="py-20 bg-soft-cream relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-4xl font-serif font-bold text-soft-text mb-12"
            style={{
              fontSize: "36px",
            }}
          >
            Love Notes
          </h2>

          <div className="relative bg-white p-12 rounded-3xl shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center"
              >
                <Heart className="w-12 h-12 text-soft-pink mb-6 fill-current" />
                <p className="text-2xl font-serif text-gray-700 mb-6 italic">
                  "{TESTIMONIALS[currentIndex].text}"
                </p>
                <p className="font-bold text-soft-accent">
                  — {TESTIMONIALS[currentIndex].author}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="p-2 rounded-full bg-soft-cream hover:bg-[var(--color-soft-pink)] hover:text-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={next}
                className="p-2 rounded-full bg-soft-cream hover:bg-[var(--color-soft-pink)] hover:text-white transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Blog = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <section id="blog" className="py-20 bg-landingpage">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            className="text-4xl font-serif font-bold text-soft-text mb-4"
            style={{
              fontSize: "36px",
            }}
          >
            Puisi Kecil Untuk Sayangku
          </h2>
          <div className="w-20 h-1 bg-[var(--color-soft-pink)] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {BLOG_POSTS.map((post) => (
            <motion.div
              layout
              key={post.id}
              whileHover={{ y: -10 }}
              onClick={() =>
                setExpandedId(expandedId === post.id ? null : post.id)
              }
              className={`bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer ${
                expandedId === post.id ? "md:col-span-3" : ""
              }`}
            >
              <motion.div layout>
                <span className="text-sm text-soft-accent font-medium">
                  {post.date}
                </span>
                <h3 className="text-xl font-bold text-soft-text mt-2 mb-3">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>

                <AnimatePresence>
                  {expandedId === post.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-gray-700 overflow-hidden"
                    >
                      <p className="mb-4 whitespace-pre-line">{post.content}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="text-soft-pink font-medium hover:text-soft-accent flex items-center gap-1">
                  {expandedId === post.id ? "Show less" : "Read more"}
                  <motion.div
                    animate={{ rotate: expandedId === post.id ? 90 : 0 }}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MusicPlayer = () => {
  return (
    <section className="py-20 bg-soft-cream relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 max-w-4xl mx-auto text-center">
        <h2
          className="text-4xl font-serif font-bold text-soft-text mb-12"
          style={{
            fontSize: "36px",
          }}
        >
          Jangan Lupa Dengerin Lagu Ini Yaa ❤️
        </h2>

        <div className="relative bg-soft-cream p-12 rounded-3xl shadow-lg flex flex-col items-center gap-6 hover:ring-4 ring-[var(--color-soft-accent)] transition-all duration-300">
          {MUSIC_TRACKS.map((track) => (
            <iframe
              key={track.id}
              src={track.src}
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen={true}
              title={track.title}
              className="rounded-xl shadow-lg bg-[--color-soft-cream]"
              style={{ borderRadius: "1rem" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-landingpage text-soft-text selection:bg-[var(--color-soft-pink)] selection:text-white">
      <Navbar />
      <Hero />
      <MusicPlayer />
      <Gallery />
      <Testimonials />
      <Blog />
    </div>
  );
};

export default LandingPage;
