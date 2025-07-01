// src/components/Navbar.tsx

import { useState, useEffect } from "react";
import type React from "react";
import { Menu, X, Home, User, Code, Briefcase, Mail } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home", icon: Home },
    { name: "About", href: "#about", icon: User },
    { name: "Skills", href: "#skills", icon: Code },
    { name: "Projects", href: "#projects", icon: Briefcase },
    { name: "Contact", href: "#contact", icon: Mail },
  ];

  // The new smooth scroll handler function
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault(); // Prevent the default anchor jump
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start", // Aligns the top of the section with the top of the viewport
      });
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
          scrolled ? "glass-purple shadow-xl" : ""
        } rounded-full px-6 py-3 hidden md:block`}
      >
        <div className="flex items-center space-x-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleSmoothScroll(e, item.href)} // Updated onClick
              className="group text-black hover:text-white/80 px-3 py-2 text-sm font-medium transition-all duration-300 rounded-full hover:bg-white/10"
              aria-label={item.name}
            >
              <item.icon size={20} />
            </a>
          ))}
        </div>
      </nav>

      {/* Mobile Navbar */}
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
                    handleSmoothScroll(e, item.href); // Updated onClick
                    setIsOpen(false); // Also close the menu on click
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
