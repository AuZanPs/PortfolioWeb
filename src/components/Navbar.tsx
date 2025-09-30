// src/components/Navbar.tsx

import { useState, useMemo, useCallback } from "react";
import { Menu, X, Home, User, Code, Briefcase, Mail, LayoutGrid } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Memoize navigation items to prevent recreation
  const navItems = useMemo(() => [
    { name: "Home", href: "#home", icon: Home },
    { name: "About", href: "#about", icon: User },
    { name: "Experience", href: "#experience", icon: Briefcase },
    { name: "Skills", href: "#skills", icon: LayoutGrid },
    { name: "Projects", href: "#projects", icon: Code },
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
      {/* Desktop Navbar - Always visible with clean design */}
      <nav
        className="fixed left-1/2 -translate-x-1/2 top-6 z-50 transition-all duration-500 ease-out rounded-full px-6 py-3 hidden md:block opacity-100 shadow-lg"
        style={{
          backfaceVisibility: 'hidden',
          perspective: 1000,
          background: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid #9290C3',
          backdropFilter: 'blur(10px)'
        }}
      >
        <div className="flex items-center space-x-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleSmoothScroll(e, item.href)}
              className="group transition-colors duration-200 rounded-full px-3 py-2 text-sm font-medium hover:bg-gray-100"
              style={{color: '#070F2B'}}
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
          className="p-3 rounded-full shadow-lg"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid #9290C3',
            backdropFilter: 'blur(10px)'
          }}
          aria-label="Open menu"
        >
          <X size={20} className={`transition-transform duration-200 ${isOpen ? 'rotate-0' : 'rotate-180 scale-0'}`} style={{color: '#070F2B'}} />
          <Menu size={20} className={`transition-transform duration-200 absolute top-3 left-3 ${isOpen ? '-rotate-180 scale-0' : 'rotate-0'}`} style={{color: '#070F2B'}} />
        </button>

        {isOpen && (
          <div className="absolute top-16 right-0 rounded-2xl p-4 shadow-xl min-w-[200px]" style={{
            background: 'rgba(255, 255, 255, 0.98)',
            border: '1px solid #9290C3',
            backdropFilter: 'blur(10px)'
          }}>
            <div className="space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    handleSmoothScroll(e, item.href);
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors duration-200 hover:bg-gray-100 rounded-xl"
                  style={{color: '#070F2B'}}
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
