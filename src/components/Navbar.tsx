// src/components/Navbar.tsx

import { useState, useEffect } from "react";
import type React from "react";
import { Menu, X, Home, User, Code, Briefcase, Mail } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // --- NEW STATE FOR AUTO-HIDING ---
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Set scrolled state for background color change
      setScrolled(currentScrollY > 20);

      // --- NEW LOGIC FOR AUTO-HIDING ---
      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      // Remember current scroll position for the next move
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-full px-6 py-3 hidden md:block ${
          // --- UPDATED CLASSES FOR AUTO-HIDING ---
          // Controls visibility and position
          visible ? "top-6" : "-top-24"
        } ${
          // Controls background style based on scroll position
          scrolled ? "glass-purple shadow-xl" : "bg-white/20 backdrop-blur-md"
        }`}
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

      {/* Mobile Navbar (auto-hiding is often not ideal for mobile menu buttons) */}
      <nav className="fixed top-6 right-6 z-50 md:hidden">
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
