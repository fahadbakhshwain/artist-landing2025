import React, { useState, useEffect } from "react";
import { Menu, X, Download, Mail, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Checkbox } from "./components/ui/checkbox";

import OverlayMenu from "./components/artist/OverlayMenu";
import Lightbox from "./components/artist/Lightbox";
import ProjectDrawer from "./components/artist/ProjectDrawer";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [projectDrawerOpen, setProjectDrawerOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  // صور تجريبية — بدّلها بروابطك لاحقًا
  const portfolioImages = [
    { id: 1, src: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800", alt: "Abstract", category: "paintings" },
    { id: 2, src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800", alt: "Sculpture", category: "sculptures" },
    { id: 3, src: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800", alt: "Minimal", category: "paintings" },
    { id: 4, src: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800", alt: "Digital", category: "digital" },
    { id: 5, src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800", alt: "Mixed", category: "mixed" },
    { id: 6, src: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800", alt: "Canvas", category: "paintings" },
    { id: 7, src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800", alt: "Install", category: "sculptures" },
    { id: 8, src: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800", alt: "Portrait", category: "paintings" },
    { id: 9, src: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800", alt: "Geometric", category: "mixed" }
  ];

  const projects = [
    {
      id: 1,
      title: "Metamorphosis",
      place: "MoMA, New York",
      year: "2024",
      description: "Exhibition exploring urban transformation through contemporary installations.",
      images: [
        "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=1200",
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200"
      ]
    },
    {
      id: 2,
      title: "Digital Horizons",
      place: "Tate Modern, London",
      year: "2023",
      description: "Immersive digital experience bridging physical and virtual spaces.",
      images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200"]
    }
  ];

  const pressItems = [
    { id: 1, title: "Rising Stars", outlet: "Artforum", year: "2024", image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=600", link: "#" },
    { id: 2, title: "Future of Digital Art", outlet: "Art in America", year: "2024", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600", link: "#" },
    { id: 3, title: "New Voices", outlet: "Frieze", year: "2023", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600", link: "#" }
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };
  const openLightbox = (images, index = 0) => {
    setLightboxImages(images);
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };
  const openProjectDrawer = (p) => {
    setSelectedProject(p);
    setProjectDrawerOpen(true);
  };
  const filteredImages = activeFilter === "all" ? portfolioImages : portfolioImages.filter(i => i.category === activeFilter);

  useEffect(() => {
    const onScroll = () => {
      document.querySelectorAll("[data-animate]").forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("animate-in");
      });
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="font-['Inter'] bg-neutral-50 text-neutral-900 overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 p-6 flex justify-between items-center">
        <div className="text-white text-lg font-bold tracking-wider">Artist Website 2025</div>
        <Button variant="ghost" onClick={() => setIsMenuOpen(true)} className="text-white hover:text-blue-500 text-sm font-medium">
          <Menu className="w-4 h-4 mr-2" /> menu
        </Button>
      </header>

      {/* Hero */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.3)), url('https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=1920')` }}
        />
        <div className="relative z-10 text-center text-white" data-animate>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-4 opacity-0 translate-y-8 transition-all duration-1000 ease-out">
            SWIMMING IN NONSENSE
          </h1>
          <p className="text-2xl md:text-3xl font-light tracking-widest uppercase mb-8 opacity-0 translate-y-4 transition-all duration-1000 delay-300 ease-out">
            SINCE 1988
          </p>
          <Button onClick={() => scrollToSection("contact")} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium rounded-none transition-all duration-300 opacity-0 translate-y-4 delay-500">
            Contact
          </Button>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center" data-animate>
          <div>
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800" alt="Artist" className="w-full h-96 object-cover grayscale hover:grayscale-0 transition-all duration-500" />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-light tracking-tight">About</h2>
            <p className="text-lg leading-relaxed text-neutral-600">
              Working at the intersection of traditional media and digital innovation.
            </p>
            <div className="flex gap-4 pt-4">
              <Button variant="outline"><Download className="w-4 h-4 mr-2" /> Download CV</Button>
              <Button onClick={() => scrollToSection("contact")} className="bg-blue-600 hover:bg-blue-700 text-white"><Mail className="w-4 h-4 mr-2" /> Email Artist</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="work" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-animate>
            <h2 className="text-4xl font-light tracking-tight mb-8">Portfolio</h2>
            <div className="flex justify-center gap-8 text-sm font-medium">
              {["all","paintings","sculptures","digital","mixed"].map(f=>(
                <button key={f} onClick={()=>setActiveFilter(f)} className={`uppercase tracking-wide ${activeFilter===f?'text-blue-600':'text-neutral-400 hover:text-neutral-900'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="masonry-grid" data-animate>
            {filteredImages.map((image, index)=>(
              <div key={image.id} className="masonry-item group cursor-pointer" onClick={()=>openLightbox(filteredImages.map(i=>i.src), index)}>
                <img src={image.src} alt={image.alt} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" loading="lazy"/>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 px-6 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-light tracking-tight text-center mb-16" data-animate>Exhibitions & Projects</h2>
          <div className="space-y-8" data-animate>
            {projects.map(p=>(
              <div key={p.id} className="grid md:grid-cols-3 gap-8 p-8 bg-white hover:shadow-lg transition duration-500 cursor-pointer group" onClick={()=>openProjectDrawer(p)}>
                <div><img src={p.images[0]} alt={p.title} className="w-full h-48 object-cover grayscale group-hover:grayscale-0 transition"/></div>
                <div className="md:col-span-2 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-light">{p.title}</h3>
                    <span className="text-sm text-neutral-500">{p.year}</span>
                  </div>
                  <p className="text-neutral-600">{p.place}</p>
                  <p className="text-neutral-700">{p.description}</p>
                  <Button variant="link">Read more <ExternalLink className="w-4 h-4 ml-1"/></Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press */}
      <section id="press" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-light tracking-tight text-center mb-16" data-animate>Press & Media</h2>
          <div className="grid md:grid-cols-3 gap-8" data-animate>
            {pressItems.map(item=>(
              <div key={item.id} className="group">
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover mb-4 grayscale group-hover:grayscale-0 transition"/>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium group-hover:text-blue-600 transition">{item.title}</h3>
                  <p className="text-sm text-neutral-600">{item.outlet} • {item.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16" data-animate>
          <div>
            <h2 className="text-4xl font-light mb-8">Get in Touch</h2>
            <p className="text-neutral-300 mb-2">Email</p>
            <a href="mailto:hello@artist.com" className="text-xl hover:text-blue-400">hello@artist.com</a>
          </div>
          <form className="space-y-6">
            <Input placeholder="Your name" className="bg-transparent border-neutral-700 text-white placeholder:text-neutral-400 rounded-none"/>
            <Input type="email" placeholder="Email address" className="bg-transparent border-neutral-700 text-white placeholder:text-neutral-400 rounded-none"/>
            <Textarea rows={5} placeholder="Your message" className="bg-transparent border-neutral-700 text-white placeholder:text-neutral-400 rounded-none resize-none"/>
            <label className="text-sm text-neutral-300 flex gap-2 items-start">
              <Checkbox className="border-neutral-700"/><span>I consent to storing my info for response purposes.</span>
            </label>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-none font-medium">Send Message</Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-black text-white text-center">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <p>© 2025 Artist Website 2025. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="mailto:hello@artist.com" className="hover:text-blue-400">hello@artist.com</a>
            {["Instagram","Behance","LinkedIn"].map(p=>(<a key={p} href="#" className="hover:text-blue-400">{p}</a>))}
          </div>
        </div>
      </footer>

      {/* Overlay / Lightbox / Drawer */}
      <OverlayMenu isOpen={isMenuOpen} onClose={()=>setIsMenuOpen(false)} onNavigate={scrollToSection}/>
      <Lightbox isOpen={lightboxOpen} onClose={()=>setLightboxOpen(false)} images={lightboxImages} currentIndex={currentImageIndex} onIndexChange={setCurrentImageIndex}/>
      <ProjectDrawer isOpen={projectDrawerOpen} onClose={()=>setProjectDrawerOpen(false)} project={selectedProject}/>

      {/* Masonry + animations */}
      <style>{`
        .masonry-grid{columns:1;column-gap:2rem}
        @media (min-width:640px){.masonry-grid{columns:2}}
        @media (min-width:1024px){.masonry-grid{columns:3}}
        .masonry-item{break-inside:avoid;margin-bottom:2rem;position:relative;overflow:hidden}
        [data-animate]{opacity:0;transform:translateY(2rem);transition:all 1s ease-out}
        [data-animate].animate-in{opacity:1;transform:translateY(0)}
      `}</style>
    </div>
  );
}
