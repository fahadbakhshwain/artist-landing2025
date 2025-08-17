import React, { useState } from "react";

export default function App() {
  // يضمن أن مسار الصورة يشتغل على GitHub Pages داخل /artist-landing2025/
  const hero = `${import.meta.env.BASE_URL}img/hero.jpg`;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between p-6">
        <div
          className="text-white text-lg font-bold tracking-normal"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Huda Beydoun
        </div>

        <button
          onClick={() => setMenuOpen(true)}
          className="flex items-center gap-2 text-white/90 hover:text-white border border-white/50 px-3 py-1 text-sm"
        >
          <span className="text-lg" aria-hidden>≡</span>
          <span>menu</span>
        </button>
      </header>

      {/* Hero */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* الخلفية فل سكرين */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${hero}')` }}
        />
        {/* تغميق بسيط للقراءة */}
        <div className="absolute inset-0 bg-black/35" />

        {/* النص فوق الصورة */}
        <div className="relative z-10 text-center text-white px-4">
          <h1
            className="font-black uppercase mb-4 leading-tight"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              letterSpacing: "0",
              fontSize: "clamp(40px, 9vw, 140px)",
            }}
          >
            SWIMMING IN NONSENSE
          </h1>

          <p
            className="uppercase mb-6"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(16px, 2.2vw, 28px)",
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

      {/* Overlay Menu */}
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

      {/* placeholder لقسم تواصل عشان زر Contact يشتغل */}
      <section id="contact" className="h-1" />
    </div>
  );
}
