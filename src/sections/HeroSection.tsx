// src/sections/HeroSection.tsx

import { useCallback } from "react";
import { ArrowDown, Code, Download } from "lucide-react";



const HeroSection = () => {
  // The smooth scroll handler function, copied from the Navbar
  const handleSmoothScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault(); // Prevent the default anchor jump
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-white">
      {/* Subtle Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-5" style={{background: 'radial-gradient(circle, #535C91 0%, transparent 70%)'}}></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-5" style={{background: 'radial-gradient(circle, #9290C3 0%, transparent 70%)'}}></div>

      <div className="container-custom relative z-10">
        <div className="text-center">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-200 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gradient mb-8">
              Muhammad Auzan
              <span className="block text-gradient-accent">Putra Siregar</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Building intuitive digital experiences. I'm a developer who transforms concepts into fully deployed applications using modern web technologies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#projects"
                onClick={(e) => handleSmoothScroll(e, "#projects")}
                className="bg-white px-8 py-4 rounded-full border-2 hover:bg-gray-50 transition-all duration-300 hover:scale-105 flex items-center gap-2 group shadow-md"
                style={{borderColor: '#535C91', color: '#070F2B'}}
              >
                <Code size={20} className="group-hover:scale-110 transition-transform duration-300" />
                View My Work
              </a>
              <a
                href="/Auzan_Putra_CV.pdf"
                download
                className="px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 flex items-center gap-2 group shadow-md"
                style={{backgroundColor: '#535C91', color: 'white'}}
              >
                <Download size={20} className="group-hover:scale-110 transition-transform duration-300" />
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="bg-white p-3 rounded-full shadow-md border border-gray-200">
          <ArrowDown size={20} style={{color: '#535C91'}} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
