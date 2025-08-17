import React, { useEffect, useState, useRef } from "react";

/** ملاحظة مهمة للملفات:
 *  ضع الصور داخل public/img/  مثل:
 *  hero.jpg, about1.jpg, about2.jpg, p1.jpg ... p6.jpg, press1.jpg, press2.jpg
 *  وضع الفيديو داخل public/video/ مثل: portfolio.mp4, projects.mp4
 */

const base = import.meta.env.BASE_URL;

// مساعد لمسارات آمنة على GitHub Pages مع صورة احتياطية
const imgSrc = (name, fallback) =>
  `${base}img/${name}`, // المتصفح سيجرب المحلي، ولو فشل الخلفية الثانية ستظهر إن فعّلناها كـ background-image متعدد
  vidSrc = (name) => `${base}video/${name}`;

export default function App() {
  const [view, setView] = useState("home"); // home | about | work | projects | press | contact
  const [menuOpen, setMenuOpen] = useState(false);

  // تمرير ناعم
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    window.scrollTo(0, 0);
  }, [view]);

  const go = (section) => {
    setView(section);
    setMenuOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* ===== Header ثابت ===== */}
      <Header onMenu={() => setMenuOpen(true)} />

      {/* ===== سوشيال ثابت ===== */}
      <SocialBar />

      {/* ===== المَشاهد ===== */}
      {view === "home" && <Hero onGoContact={() => go("contact")} />}

      {view !== "home" && (
        <main className="pt-20"> {/* مسافة تحت الهيدر */}
          {view === "about" && <AboutSection />}
          {view === "work" && <WorkSection />}
          {view === "projects" && <ProjectsSection />}
          {view === "press" && <PressSection />}
          {view === "contact" && <ContactSection />}
        </main>
      )}

      {/* ===== قائمة منيو Overlay ===== */}
      {menuOpen && <OverlayMenu onClose={() => setMenuOpen(false)} onGo={go} />}
    </div>
  );
}

/* ===================== Header ===================== */
function Header({ onMenu }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between p-6">
      <div className="text-white text-xl font-extrabold tracking-tight select-none">
        hudabeydoun
      </div>
      <button
        onClick={onMenu}
        className="flex items-center gap-2 text-white/90 hover:text-white border border-white/60 px-3 py-1 text-sm"
      >
        <span className="text-lg" aria-hidden>≡</span>
        <span>menu</span>
      </button>
    </header>
  );
}

/* ===================== Social Bar ===================== */
function SocialBar() {
  const linkCls =
    "block w-9 h-9 rounded-full border border-white/40 flex items-center justify-center hover:bg-white hover:text-black transition";
  return (
    <aside className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
      <a className={linkCls} href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">IG</a>
      <a className={linkCls} href="https://behance.net" target="_blank" rel="noreferrer" aria-label="Behance">Bē</a>
      <a className={linkCls} href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
    </aside>
  );
}

/* ===================== Hero ===================== */
function Hero({ onGoContact }) {
  const heroLocal = `${base}img/hero.jpg`;
  const heroFallback =
    "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=1920";
  const backgroundImage = `linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.35)), url('${heroLocal}'), url('${heroFallback}')`;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage }}
      />
      <div className="relative z-10 text-center px-4">
        <h1
          className="font-black uppercase leading-tight mb-4"
          style={{ fontSize: "clamp(42px, 9.2vw, 140px)" }}
        >
          SWIMMING IN NONSENSE
        </h1>
        <p
          className="uppercase mb-6"
          style={{ fontSize: "clamp(16px, 2.2vw, 28px)", letterSpacing: ".06em" }}
        >
          SINCE 1988
        </p>
        <button
          onClick={onGoContact}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-sm"
        >
          Contact
        </button>
      </div>
    </section>
  );
}

/* ===================== Overlay Menu ===================== */
function OverlayMenu({ onClose, onGo }) {
  const items = [
    ["home", "home"],
    ["about", "about / bio"],
    ["work", "work portfolio"],
    ["projects", "projects / exhibitions"],
    ["press", "press / media"],
    ["contact", "contact"],
  ];
  return (
    <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-2xl"
        aria-label="Close menu"
      >
        ×
      </button>
      <ul className="text-center text-white space-y-3 text-xl">
        {items.map(([id, label]) => (
          <li key={id}>
            <button onClick={() => onGo(id)} className="hover:text-blue-400">
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ===================== About Section ===================== */
function AboutSection() {
  // صور عن القسم (بدّل الأسماء بما ترفعه داخل public/img/)
  const first = `${base}img/about1.jpg`;
  const second = `${base}img/about2.jpg`;
  const fall1 =
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600";
  const fall2 =
    "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=1600";

  return (
    <div className="bg-white text-neutral-900">
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-semibold">About / Bio</h2>
          <h3 className="text-xl font-medium">Huda Beydoun</h3>
          <p className="text-neutral-600">
            Visual Artist | Photographer | Creative Director
          </p>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              Born in 1988 in Saudi Arabia, Huda Beydoun is a multidisciplinary
              visual artist, photographer, and creative director whose work has
              been exhibited locally and internationally since 2009. Her
              practice spans painting, mixed media, digital art, and
              photography, weaving together vibrant colors and layered
              narratives that explore the depth of human experience.
            </p>
            <p>
              Her distinctive visual language often pairs joyful, striking
              compositions with subtle emotional undercurrents, inviting viewers
              to look beyond the surface.
            </p>
            <p>
              In 2018, she moved to Paris to study fashion photography under
              the creative direction of Paolo Roversi and Dominique Issermann,
              an experience that refined her ability to merge conceptual vision
              with technical precision. Her work as a creative director has
              further shaped her capacity to curate cohesive visual worlds, from
              individual artworks to large-scale projects.
            </p>
            <p>
              Her work has been presented in galleries, cultural institutions,
              and art fairs, and is recognized for its ability to connect
              audiences across cultures through both visual impact and emotional
              resonance. Guided by a commitment to authenticity and a refined
              artistic vision, Huda continues to expand her creative practice
              while remaining rooted in the shared human condition.
            </p>
          </div>
        </div>
      </section>

      {/* صورة كبيرة + نص بدخول متعاكس */}
      <RevealRow
        img={`${first}, url('${fall1}')`}
        title="On Craft & Process"
        text="A practice shaped by curiosity, discipline, and play—where images evolve through layers of intuition and precision."
        reverse={false}
      />
      <RevealRow
        img={`${second}, url('${fall2}')`}
        title="Concept & Emotion"
        text="Joyful visuals meet subtle undercurrents—inviting a slower reading beyond the first impression."
        reverse={true}
      />
    </div>
  );
}

function RevealRow({ img, title, text, reverse = false }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      (e) => e.forEach((x) => x.isIntersecting && setShow(true)),
      { threshold: 0.2 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <section
      ref={ref}
      className={`grid md:grid-cols-2 gap-10 items-center px-6 py-16 bg-white`}
    >
      <div
        className={`h-[60vh] bg-cover bg-center ${show ? "opacity-100 translate-x-0" : reverse ? "-translate-x-6" : "translate-x-6"} opacity-0 transition-all duration-700`}
        style={{ backgroundImage: `url(${img})` }}
      />
      <div
        className={`${show ? "opacity-100 translate-x-0" : reverse ? "translate-x-6" : "-translate-x-6"} opacity-0 transition-all duration-700`}
      >
        <h3 className="text-2xl font-semibold mb-3">{title}</h3>
        <p className="text-lg text-neutral-700 leading-relaxed">{text}</p>
      </div>
    </section>
  );
}

/* ===================== Work / Portfolio ===================== */
function WorkSection() {
  // فيديو علوي (ضع ملفك داخل public/video/portfolio.mp4)
  const videoLocal = vidSrc("portfolio.mp4");
  const fallbackMP4 =
    "https://cdn.coverr.co/videos/coverr-paint-on-canvas-1607/1080p.mp4";

  // سلايدر رئيسي
  const slides = [
    {
      src: `${base}img/p1.jpg`,
      fallback:
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1600",
      title: "Untitled I",
      caption:
        "Mixed media on canvas, 2023. Layers of acrylic and digital transfer.",
      gallery: [
        `${base}img/p1.jpg`,
        `${base}img/p1b.jpg`,
        `${base}img/p1c.jpg`,
      ],
    },
    {
      src: `${base}img/p2.jpg`,
      fallback:
        "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=1600",
      title: "Untitled II",
      caption: "Digital compositing with hand-painted textures.",
      gallery: [`${base}img/p2.jpg`, `${base}img/p2b.jpg`],
    },
    {
      src: `${base}img/p3.jpg`,
      fallback:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600",
      title: "Untitled III",
      caption: "Large-scale print with pigment on archival paper.",
      gallery: [`${base}img/p3.jpg`],
    },
  ];

  return (
    <section className="bg-white text-neutral-900">
      {/* فيديو + وصف */}
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="aspect-video w-full bg-black overflow-hidden">
          <video
            className="w-full h-full object-cover"
            src={videoLocal}
            onError={(e) => (e.currentTarget.src = fallbackMP4)}
            controls
            playsInline
          />
        </div>
        <p className="mt-6 text-lg text-neutral-700">
          A selection from recent bodies of work—spanning painting, digital
          compositing, and photographic experiments.
        </p>
      </div>

      {/* سلايدر كبير */}
      <BigCarousel slides={slides} />

      {/* كتلة interleave: صورة يسار/نص يمين ثم عكسها */}
      <div className="max-w-6xl mx-auto px-6 py-20 space-y-20">
        <Interleave
          img={`${base}img/p4.jpg`}
          fallback="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600"
          title="Material Encounters"
          text="Intersections of textile, paint, and light—where surfaces learn to breathe."
          reverse={false}
        />
        <Interleave
          img={`${base}img/p5.jpg`}
          fallback="https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=1600"
          title="Figures in Motion"
          text="Bodies rendered as rhythms—gestures turning into geometry."
          reverse={true}
        />
      </div>
    </section>
  );
}

function BigCarousel({ slides }) {
  const [i, setI] = useState(0);
  const [lightbox, setLightbox] = useState(null); // {images:[], idx:number}

  const next = () => setI((p) => (p + 1) % slides.length);
  const prev = () => setI((p) => (p - 1 + slides.length) % slides.length);
  const s = slides[i];

  return (
    <>
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="relative h-[60vh] bg-neutral-100 overflow-hidden">
          <img
            src={s.src}
            onError={(e) =>
              (e.currentTarget.src =
                s.fallback || "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1600")
            }
            alt={s.title}
            className="w-full h-full object-cover"
          />
          {/* أسهم */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black px-3 py-2"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black px-3 py-2"
          >
            ›
          </button>

          {/* فتح لايت بوكس */}
          <button
            onClick={() =>
              setLightbox({ images: s.gallery?.length ? s.gallery : [s.src], idx: 0 })
            }
            className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1 text-sm"
          >
            View Gallery
          </button>
        </div>
        <div className="py-5">
          <h3 className="text-xl font-semibold">{s.title}</h3>
          <p className="text-neutral-600">{s.caption}</p>
        </div>
      </div>

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          startIndex={lightbox.idx}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}

function Interleave({ img, fallback, title, text, reverse }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      (e) => e.forEach((x) => x.isIntersecting && setShow(true)),
      { threshold: 0.2 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`grid md:grid-cols-2 gap-10 items-center ${reverse ? "md:flex-row-reverse" : ""}`}
    >
      <div
        className={`h-[55vh] bg-neutral-200 overflow-hidden ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} transition-all duration-700`}
      >
        <img
          src={img}
          onError={(e) => (e.currentTarget.src = fallback)}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div
        className={`${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"} transition-all duration-700`}
      >
        <h4 className="text-2xl font-semibold mb-3">{title}</h4>
        <p className="text-lg text-neutral-700 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

/* ===================== Projects ===================== */
function ProjectsSection() {
  const videoLocal = vidSrc("projects.mp4");
  const fallbackMP4 =
    "https://cdn.coverr.co/videos/coverr-ultra-modern-structure-5894/1080p.mp4";

  return (
    <section className="bg-white text-neutral-900">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="aspect-video w-full bg-black overflow-hidden">
          <video
            className="w-full h-full object-cover"
            src={videoLocal}
            onError={(e) => (e.currentTarget.src = fallbackMP4)}
            controls
            playsInline
          />
        </div>
        <h2 className="text-3xl font-semibold mt-10 mb-6">
          Exhibitions & Projects
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {["Metamorphosis (2024)", "Digital Horizons (2023)", "Echoes of Tomorrow (2023)"].map(
            (t, i) => (
              <div key={i} className="border border-neutral-200 p-5 hover:shadow-md transition">
                <h3 className="font-semibold">{t}</h3>
                <p className="text-neutral-600 mt-2">
                  A short description about concept, venue, and year.
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

/* ===================== Press / Media ===================== */
function PressSection() {
  const a = `${base}img/press1.jpg`;
  const b = `${base}img/press2.jpg`;
  const fa =
    "https://images.unsplash.com/photo-1600691222747-2b0fc0a13a2e?w=2000";
  const fb =
    "https://images.unsplash.com/photo-1558885544-2a5a569f5f5c?w=2000";

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-neutral-900 text-3xl font-semibold mb-10">
          Press / Media
        </h2>

        {/* بانلات كبيرة (سبليت) */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="aspect-[4/3] bg-neutral-100 overflow-hidden">
            <img
              src={a}
              onError={(e) => (e.currentTarget.src = fa)}
              alt="Press feature A"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[4/3] bg-neutral-100 overflow-hidden">
            <img
              src={b}
              onError={(e) => (e.currentTarget.src = fb)}
              alt="Press feature B"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== Contact ===================== */
function ContactSection() {
  return (
    <section className="bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-semibold mb-6">Contact</h2>
        <p className="mb-2">
          Email: <a href="mailto:hello@artist.com" className="underline">hello@artist.com</a>
        </p>
        <p>Instagram · Behance · LinkedIn</p>
      </div>
    </section>
  );
}

/* ===================== Lightbox ===================== */
function Lightbox({ images, startIndex = 0, onClose }) {
  const [i, setI] = useState(startIndex);
  const next = () => setI((p) => (p + 1) % images.length);
  const prev = () => setI((p) => (p - 1 + images.length) % images.length);
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-2xl"
        aria-label="Close"
      >
        ×
      </button>
      <button
        onClick={prev}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white text-black px-3 py-1"
      >
        ‹
      </button>
      <img
        src={images[i]}
        alt=""
        className="max-w-[90vw] max-h-[80vh] object-contain"
      />
      <button
        onClick={next}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white text-black px-3 py-1"
      >
        ›
      </button>
    </div>
  );
}
