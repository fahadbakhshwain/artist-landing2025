import React, { useState } from "react";

export default function App() {
  // صورة محليّة (لو رفعتها في public/img/hero.jpg)
  const heroLocal = `${import.meta.env.BASE_URL}img/hero.jpg`;
  // صورة احتياطيّة اونلاين (تشتغل لو المحليّة غير موجودة)
  const heroFallback =
    "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=1920";
  const backgroundImage = `linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.35)), url('${heroLocal}'), url('${heroFallback}')`;

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* ===== Header ===== */}
      <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between p-6">
        <div className="text-white text-xl font-extrabold tracking-tight">
          hudabeydoun
        </div>
        <button
          onClick={() => setMenuOpen(true)}
          className="flex items-center gap-2 text-white/90 hover:text-white border border-white/60 px-3 py-1 text-sm"
        >
          <span className="text-lg" aria-hidden>
            ≡
          </span>
          <span>menu</span>
        </button>
      </header>

      {/* ===== Hero ===== */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* الخلفية فل سكرين */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage }}
        />
        {/* النص */}
        <div className="relative z-10 text-center px-4">
          <h1
            className="font-black uppercase leading-tight mb-4"
            style={{
              // حجم واحد متّسق للكلمة الكبيرة (يلف للسطر التالي تلقائياً)
              fontSize: "clamp(42px, 9.2vw, 140px)",
              letterSpacing: "0",
            }}
          >
            SWIMMING IN NONSENSE
          </h1>
          <p
            className="uppercase mb-6"
            style={{
              fontSize: "clamp(16px, 2.2vw, 28px)",
              letterSpacing: ".06em",
            }}
          >
            SINCE 1988
          </p>
          <a
            href="#contact"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-sm"
          >
            Contact
          </a>
        </div>
      </section>

      {/* ===== Sections ===== */}
      <section id="about" className="py-24 px-6 bg-white text-neutral-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-6">About / Bio</h2>
          <p className="text-lg leading-relaxed">
            اكتب نبذة قصيرة عنك هنا. سطرين–ثلاثة تكفي كبداية. نعدّل الصياغة
            لاحقًا.
          </p>
        </div>
      </section>

      <section id="work" className="py-24 px-6 bg-neutral-50 text-neutral-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-10">Work Portfolio</h2>
          {/* شبكة مؤقّتة — لاحقًا نبدّلها بصورك من public/img/ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800",
              "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800",
              "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
              "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800",
              "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800",
              "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="w-full h-64 object-cover"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-24 px-6 bg-white text-neutral-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-6">Projects / Exhibitions</h2>
          <ul className="space-y-4">
            <li className="border border-neutral-200 p-4">
              Metamorphosis — MoMA, New York — 2024
            </li>
            <li className="border border-neutral-200 p-4">
              Digital Horizons — Tate Modern, London — 2023
            </li>
            <li className="border border-neutral-200 p-4">
              Echoes of Tomorrow — Paris — 2023
            </li>
          </ul>
        </div>
      </section>

      <section id="press" className="py-24 px-6 bg-neutral-50 text-neutral-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-6">Press / Media</h2>
        <div className="grid md:grid-cols-3 gap-6">
            <a href="#" className="block border border-neutral-200 p-4 hover:bg-neutral-100">
              Artforum — Rising Stars (2024)
            </a>
            <a href="#" className="block border border-neutral-200 p-4 hover:bg-neutral-100">
              Art in America — Future of Digital Art (2024)
            </a>
            <a href="#" className="block border border-neutral-200 p-4 hover:bg-neutral-100">
              Frieze — New Voices (2023)
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 px-6 bg-black text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-6">Contact</h2>
          <p className="mb-2">
            Email:{" "}
            <a href="mailto:hello@artist.com" className="underline">
              hello@artist.com
            </a>
          </p>
          <p>Instagram · Behance · LinkedIn</p>
        </div>
      </section>
      {/* ===== End Sections ===== */}

      {/* ===== Overlay Menu ===== */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black/85 flex items-center justify-center">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 text-white text-2xl"
            aria-label="Close menu"
          >
            ×
          </button>
          <ul className="text-center text-white space-y-3 text-xl">
            {[
              ["home", "home"],
              ["about", "about / bio"],
              ["work", "work portfolio"],
              ["projects", "projects / exhibitions"],
              ["press", "press / media"],
              ["contact", "contact"],
            ].map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-blue-400"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
