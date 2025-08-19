// src/components/Navbar.tsx

import { useState, useEffect, useCallback } from "react";
import type React from "react";
import { Menu, X, Home, User, Code, Briefcase, Mail } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Set scrolled state for background color change
    setScrolled(currentScrollY > 20);

    // Check if we're in the hero section
    const heroSection = document.getElementById("home");
    if (heroSection) {
      const heroRect = heroSection.getBoundingClientRect();
      const heroBottom = heroRect.bottom;
      
      // Show navbar only when hero section is visible
      // Add buffer so navbar doesn't disappear too early
      setVisible(heroBottom > -50);
    }
  }, []);

  useEffect(() => {
    let ticking = false;

    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [handleScroll]);

  const navItems = [
    { name: "Home", href: "#home", icon: Home },
    { name: "About", href: "#about", icon: User },
    { name: "Skills", href: "#skills", icon: Code },
    { name: "Projects", href: "#projects", icon: Briefcase },
    { name: "Contact", href: "#contact", icon: Mail },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-out rounded-full px-6 py-3 hidden md:block ${
          // Controls visibility and position - only show when in hero section
          visible ? "top-6 opacity-100 translate-y-0" : "-top-20 opacity-0 translate-y-[-10px]"
        } ${
          // Controls background style based on scroll position
          scrolled ? "glass-purple shadow-xl" : "bg-white/20 backdrop-blur-md"
        }`}
        style={{
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
          perspective: 1000
        }}
      >
        <div className="flex items-center space-x-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleSmoothScroll(e, item.href)}
              className={`group transition-all duration-300 rounded-full px-3 py-2 text-sm font-medium hover:bg-white/20 ${
                scrolled ? "text-white" : "text-slate-700"
              }`}
              aria-label={item.name}
            >
              <item.icon size={20} />
            </a>
          ))}
        </div>
      </nav>

      {/* Mobile Navbar - keep it always visible for mobile usability */}
      <nav 
        className={`fixed top-6 right-6 z-50 md:hidden transition-all duration-700 ease-out ${
          visible ? "opacity-100 scale-100" : "opacity-50 scale-95"
        }`}
        style={{
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden'
        }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="glass-purple p-3 rounded-full shadow-xl"
          aria-label="Open menu"
        >
          <X size={20} className={`text-white transition-transform duration-300 ${isOpen ? 'rotate-0' : 'rotate-180 scale-0'}`} />
          <Menu size={20} className={`text-white transition-transform duration-300 absolute top-3 left-3 ${isOpen ? '-rotate-180 scale-0' : 'rotate-0'}`} />
        </button>

        {isOpen && (
          <div className="absolute top-16 right-0 glass-purple rounded-2xl p-4 shadow-xl min-w-[200px]">
            <div className="space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    handleSmoothScroll(e, item.href);
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 text-white hover:text-white/80 px-4 py-3 text-sm font-medium transition-all duration-300 hover:bg-white/10 rounded-xl"
                >
                  <item.icon size={18} />
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
