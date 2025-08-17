import React, { useEffect, useMemo, useRef, useState } from "react";

/* =========================================================
   1) Prefix ثابت لمجلد GitHub Pages الخاص بالموقع
   ========================================================= */
const BASE = "/artist-landing2025/";
const withBase = (p) => BASE + p.replace(/^\//, "");

/* =========================================================
   2) كل المسارات عبر withBase (لا تعتمد على BASE_URL)
   ========================================================= */
const paths = {
  hero: withBase("img/hero.jpg"),
  about1: withBase("img/about-1.jpg"),
  about2: withBase("img/about-2.jpg"),
  workVideo: withBase("video/work.mp4"),
  projectsVideo: withBase("video/projects.mp4"),
  workImages: Array.from({ length: 6 }).map((_, i) => withBase(`work/w${i + 1}.jpg`)),
  pressImages: Array.from({ length: 8 }).map((_, i) => withBase(`press/p${i + 1}.jpg`)),
};

/* بدائل Unsplash لو ملف محلي ناقص */
const fallback = {
  hero:
    "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=1920&q=80&auto=format&fit=crop",
  about1:
    "https://images.unsplash.com/photo-1520975954732-35dd22cb0ff3?w=1600&q=80&auto=format&fit=crop",
  about2:
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1600&q=80&auto=format&fit=crop",
  workImages: [
    "https://images.unsplash.com/photo-1533228100845-08145b01de14?w=1400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=1400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1526312426976-593c64a1c1a5?w=1400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?w=1400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400&q=80&auto=format&fit=crop",
  ],
  pressImages: [
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=2000&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=2000&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?w=2000&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=2000&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1526312426976-593c64a1c1a5?w=2000&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=2000&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520975954732-35dd22cb0ff3?w=2000&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=2000&q=80&auto=format&fit=crop",
  ],
};

/* محاولة تحميل الصورة المحلية أولاً، وإلا نستخدم البديل */
function useImg(preferred, fb) {
  const [url, setUrl] = useState(fb);
  useEffect(() => {
    if (!preferred) return;
    const img = new Image();
    img.onload = () => setUrl(preferred);
    img.onerror = () => setUrl(fb);
    img.src = preferred;
  }, [preferred, fb]);
  return url;
}

/* ----------------- UI الثابتة ----------------- */
function Header({ onOpenMenu }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 py-3 flex items-center justify-between bg-black/80 text-white">
      <div className="text-xl font-black tracking-tight">hudabeydouN</div>
      <button
        onClick={onOpenMenu}
        className="flex items-center gap-2 border border-white/60 px-3 py-1 hover:bg-white hover:text-black transition"
      >
        <span className="text-lg" aria-hidden>≡</span>
        <span>menu</span>
      </button>
    </header>
  );
}

function SocialBar() {
  const items = [
    ["IG", "https://instagram.com/"],
    ["Be", "https://behance.net/"],
    ["in", "https://linkedin.com/"],
  ];
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-4">
      {items.map(([t, href]) => (
        <a
          key={t}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="w-9 h-9 rounded-full bg-white/90 text-black flex items-center justify-center font-bold hover:bg-white transition"
          title={t}
        >
          {t}
        </a>
      ))}
    </div>
  );
}

function OverlayMenu({ open, onClose, onGo }) {
  if (!open) return null;
  const items = [
    ["home", "home"],
    ["about", "about / bio"],
    ["work", "work portfolio"],
    ["projects", "projects / exhibitions"],
    ["press", "press / media"],
    ["contact", "contact"],
  ];
  return (
    <div className="fixed inset-0 z-50 bg-black/90 text-white flex items-center justify-center">
      <button onClick={onClose} className="absolute top-6 right-6 text-3xl" aria-label="close menu">×</button>
      <ul className="space-y-3 text-center text-xl">
        {items.map(([id, label]) => (
          <li key={id}>
            <button onClick={() => { onGo(id); onClose(); }} className="hover:text-blue-400">
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ----------------- الأقسام ----------------- */
function Hero({ onContact }) {
  const hero = useImg(paths.hero, fallback.hero);
  const bg = `linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.35)), url('${hero}')`;
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: bg }} />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="font-black uppercase mb-4 leading-tight" style={{ fontSize: "clamp(40px, 9vw, 140px)" }}>
          SWIMMING IN NONSENSE
        </h1>
        <p className="uppercase mb-6" style={{ fontSize: "clamp(16px, 2.2vw, 28px)" }}>
          SINCE 1988
        </p>
        <button onClick={onContact} className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-sm">
          Contact
        </button>
      </div>
    </section>
  );
}

function About() {
  const top = useImg(paths.about1, fallback.about1);
  const imgR = useImg(paths.about2, fallback.about2);
  const imgL = useImg(paths.about1, fallback.about1);

  return (
    <section id="about" className="bg-white text-neutral-900">
      {/* صورة كبيرة أعلى القسم */}
      <div className="relative w-full h-[60vh] sm:h-[70vh] overflow-hidden">
        <img src={top} alt="Huda in studio" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
      </div>

      {/* نص البايو */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold mb-6">About / Bio</h2>
        <h3 className="text-lg font-semibold mb-2">Huda Beydoun</h3>
        <p className="text-sm text-neutral-600 mb-6">Visual Artist | Photographer | Creative Director</p>

        <div className="space-y-5 leading-7 text-[17px]">
          <p>
            Born in 1988 in Saudi Arabia, Huda Beydoun is a multidisciplinary visual artist,
            photographer, and creative director whose work has been exhibited locally and
            internationally since 2009. Her practice spans painting, mixed media, digital art,
            and photography, weaving together vibrant colors and layered narratives that explore
            the depth of human experience.
          </p>
          <p>
            Her distinctive visual language often pairs joyful, striking compositions with subtle
            emotional undercurrents, inviting viewers to look beyond the surface.
          </p>
          <p>
            In 2018, she moved to Paris to study fashion photography under the creative direction
            of Paolo Roversi and Dominique Issermann, an experience that refined her ability to
            merge conceptual vision with technical precision. Her work as a creative director has
            further shaped her capacity to curate cohesive visual worlds, from individual artworks
            to large-scale projects.
          </p>
          <p>
            Her work has been presented in galleries, cultural institutions, and art fairs, and is
            recognized for its ability to connect audiences across cultures through both visual impact
            and emotional resonance. Guided by a commitment to authenticity and a refined artistic
            vision, Huda continues to expand her creative practice while remaining rooted in the shared
            human condition.
          </p>
        </div>
      </div>

      {/* بلوك 1: نص يسار + صورة يمين */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-1">
            <h3 className="text-xl font-semibold mb-3">On Craft & Process</h3>
            <p className="text-neutral-700 leading-7">
              A practice shaped by curiosity, discipline, and play—where images evolve
              through layers of intuition and precision.
            </p>
          </div>
          <div className="order-2">
            <img src={imgR} alt="Process" className="w-full aspect-[4/3] object-cover" loading="lazy" />
          </div>
        </div>

        {/* بلوك 2: صورة يسار + نص يمين */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="md:order-1">
            <img src={imgL} alt="Concept" className="w-full aspect-[4/3] object-cover" loading="lazy" />
          </div>
          <div className="md:order-2">
            <h3 className="text-xl font-semibold mb-3">Concept & Emotion</h3>
            <p className="text-neutral-700 leading-7">
              Joyful visuals meet subtle undercurrents—inviting a slower reading
              beyond the first impression.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Lightbox({ images, index, onClose, onPrev, onNext }) {
  if (index < 0) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      <button onClick={onClose} className="absolute top-6 right-6 text-white text-3xl" aria-label="close">×</button>
      <button onClick={onPrev} className="absolute left-4 text-white text-2xl" aria-label="prev">‹</button>
      <img src={images[index]} className="max-h-[82vh] max-w-[90vw] object-contain" alt="" />
      <button onClick={onNext} className="absolute right-4 text-white text-2xl" aria-label="next">›</button>
    </div>
  );
}

function Work() {
  const [lb, setLb] = useState({ open: false, i: -1 });
  const imgs = useMemo(() => paths.workImages.slice(), []);
  const finalImgs = imgs.map((src, i) => src || fallback.workImages[i] || fallback.workImages[0]);
  const workVideo = paths.workVideo;

  return (
    <section className="pt-24 pb-16 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">Work Portfolio</h2>

      <div className="relative w-full aspect-video bg-black mb-4">
        <video src={workVideo} controls playsInline className="w-full h-full object-cover" />
      </div>
      <p className="text-neutral-600 mb-10">
        A selection from recent bodies of work—spanning painting, digital
        compositing, and photographic experiments.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {finalImgs.map((src, i) => (
          <button
            key={i}
            onClick={() => setLb({ open: true, i })}
            className="group text-left"
            title="Open"
          >
            <div className="w-full h-64 bg-neutral-100 overflow-hidden">
              <img
                src={src}
                onError={(e) => { e.currentTarget.src = fallback.workImages[i]; }}
                className="w-full h-full object-cover group-hover:scale-105 transition"
                alt=""
              />
            </div>
            <div className="mt-3">
              <div className="font-medium">Material Encounters</div>
              <div className="text-sm text-neutral-500">
                Intersections of textile, paint, and light.
              </div>
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        images={finalImgs}
        index={lb.open ? lb.i : -1}
        onClose={() => setLb({ open: false, i: -1 })}
        onPrev={() => setLb((s) => ({ ...s, i: (s.i - 1 + finalImgs.length) % finalImgs.length }))}
        onNext={() => setLb((s) => ({ ...s, i: (s.i + 1) % finalImgs.length }))}
      />
    </section>
  );
}

function Projects() {
  const videoUrl = paths.projectsVideo;
  const cards = [
    { title: "Metamorphosis", meta: "MoMA, New York — 2024", desc: "A short description about concept, venue, and year." },
    { title: "Digital Horizons", meta: "Tate Modern, London — 2023", desc: "A short description about concept, venue, and year." },
    { title: "Echoes of Tomorrow", meta: "Centre Pompidou, Paris — 2023", desc: "A short description about concept, venue, and year." },
  ];
  return (
    <section className="pt-24 pb-16 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">Exhibitions & Projects</h2>
      <div className="relative w-full aspect-video bg-black mb-8">
        <video src={videoUrl} controls playsInline className="w-full h-full object-cover" />
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((c) => (
          <div key={c.title} className="border p-5 hover:shadow-md transition">
            <div className="font-semibold">{c.title}</div>
            <div className="text-sm text-neutral-500 mb-2">{c.meta}</div>
            <p className="text-neutral-700">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Press() {
  const imgs = paths.pressImages.slice();
  const [i, setI] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setInterval(() => setI((v) => (v + 1) % imgs.length), 3500);
    return () => clearInterval(timer.current);
  }, [imgs.length]);

  return (
    <section className="pt-24 pb-16 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">Press / Media</h2>
      <div className="relative w-full overflow-hidden">
        <div className="w-full h-[52vw] max-h-[620px] bg-neutral-100">
          <img
            src={imgs[i]}
            onError={(e) => { e.currentTarget.src = fallback.pressImages[i % fallback.pressImages.length]; }}
            className="w-full h-full object-cover"
            alt="press"
          />
        </div>
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button className="px-3 py-1 bg-black/70 text-white" onClick={() => setI((v) => (v - 1 + imgs.length) % imgs.length)}>‹</button>
          <button className="px-3 py-1 bg-black/70 text-white" onClick={() => setI((v) => (v + 1) % imgs.length)}>›</button>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="pt-24 pb-16 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">Contact</h2>
      <p className="mb-2">
        Email: <a href="mailto:hello@artist.com" className="underline">hello@artist.com</a>
      </p>
      <p>Instagram · Behance · LinkedIn</p>
    </section>
  );
}

/* ----------------- App ----------------- */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [section, setSection] = useState("home");

  useEffect(() => { window.scrollTo(0, 0); }, [section]);

  return (
    <div className="bg-white text-neutral-900">
      <Header onOpenMenu={() => setMenuOpen(true)} />
      <SocialBar />
      <OverlayMenu open={menuOpen} onClose={() => setMenuOpen(false)} onGo={(id) => setSection(id)} />

      {section === "home" && <Hero onContact={() => setSection("contact")} />}
      {section === "about" && <About />}
      {section === "work" && <Work />}
      {section === "projects" && <Projects />}
      {section === "press" && <Press />}
      {section === "contact" && <Contact />}
    </div>
  );
}
