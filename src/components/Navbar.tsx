// src/components/Navbar.tsx

import { useState, useEffect, useCallback, useMemo, memo } from "react";
import type React from "react";
import { Menu, X, Home, User, Code, Briefcase, Mail } from "lucide-react";

const Navbar = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);

  // Memoize DOM element reference
  const heroSectionRef = useMemo(() => document.getElementById("home"), []);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Set scrolled state for background color change
    setScrolled(currentScrollY > 20);

    // Use cached reference instead of querying DOM every time
    if (heroSectionRef) {
      const heroRect = heroSectionRef.getBoundingClientRect();
      const heroBottom = heroRect.bottom;
      
      // Show navbar only when hero section is visible
      setVisible(heroBottom > -50);
    }
  }, [heroSectionRef]);

  useEffect(() => {
    let ticking = false;
    let lastScrollY = 0;

    const optimizedScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Skip if scroll difference is too small (micro-optimizations)
      if (Math.abs(currentScrollY - lastScrollY) < 5) return;
      
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
          lastScrollY = currentScrollY;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", optimizedScroll, { passive: true });
    return () => window.removeEventListener("scroll", optimizedScroll);
  }, [handleScroll]);

  // Memoize navigation items to prevent recreation
  const navItems = useMemo(() => [
    { name: "Home", href: "#home", icon: Home },
    { name: "About", href: "#about", icon: User },
    { name: "Skills", href: "#skills", icon: Code },
    { name: "Projects", href: "#projects", icon: Briefcase },
    { name: "Contact", href: "#contact", icon: Mail },
  ], []);

  // Memoize smooth scroll handler
  const handleSmoothScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
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
    <>
      {/* Desktop Navbar */}
      <nav
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out rounded-full px-6 py-3 hidden md:block ${
          // Controls visibility and position - only show when in hero section
          visible ? "top-6 opacity-100 translate-y-0" : "-top-20 opacity-0 translate-y-[-10px]"
        } ${
          // Controls background style based on scroll position
          scrolled ? "glass-purple shadow-xl" : "bg-white/20 backdrop-blur-md"
        }`}
        style={{
          willChange: visible ? 'transform, opacity' : 'auto',
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
              className={`group transition-colors duration-200 rounded-full px-3 py-2 text-sm font-medium hover:bg-white/20 ${
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
        className={`fixed top-6 right-6 z-50 md:hidden transition-all duration-500 ease-out ${
          visible ? "opacity-100 scale-100" : "opacity-50 scale-95"
        }`}
        style={{
          willChange: visible ? 'transform, opacity' : 'auto',
          backfaceVisibility: 'hidden'
        }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="glass-purple p-3 rounded-full shadow-xl"
          aria-label="Open menu"
        >
          <X size={20} className={`text-white transition-transform duration-200 ${isOpen ? 'rotate-0' : 'rotate-180 scale-0'}`} />
          <Menu size={20} className={`text-white transition-transform duration-200 absolute top-3 left-3 ${isOpen ? '-rotate-180 scale-0' : 'rotate-0'}`} />
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
                  className="flex items-center gap-3 text-white hover:text-white/80 px-4 py-3 text-sm font-medium transition-colors duration-200 hover:bg-white/10 rounded-xl"
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
});

Navbar.displayName = 'Navbar';

export default Navbar;
