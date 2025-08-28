// src/components/Navbar.tsx

import { useState, useMemo, useCallback } from "react";
import { Menu, X, Home, User, Code, Briefcase, Mail } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Memoize navigation items to prevent recreation
  const navItems = useMemo(() => [
    { name: "Home", href: "#home", icon: Home },
    { name: "About", href: "#about", icon: User },
    { name: "Skills", href: "#skills", icon: Code },
    { name: "Projects", href: "#projects", icon: Briefcase },
    { name: "Contact", href: "#contact", icon: Mail },
  ], []);

  // Memoize smooth scroll handler
  const handleSmoothScroll = useCallback((e: any, href: string) => {
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
      {/* Desktop Navbar - Always visible with glassmorphism */}
      <nav
        className="fixed left-1/2 -translate-x-1/2 top-6 z-50 transition-all duration-500 ease-out rounded-full px-6 py-3 hidden md:block opacity-100 glass-purple shadow-xl"
        style={{
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
              className="group transition-colors duration-200 rounded-full px-3 py-2 text-sm font-medium hover:bg-white/20 text-white"
              aria-label={item.name}
            >
              <item.icon size={20} />
            </a>
          ))}
        </div>
      </nav>

      {/* Mobile Navbar - always visible */}
      <nav 
        className="fixed top-6 right-6 z-50 md:hidden transition-all duration-500 ease-out opacity-100 scale-100"
        style={{
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
};

export default Navbar;
