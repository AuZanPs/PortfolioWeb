// src/components/Footer.tsx

import { useMemo } from "react";
import { Github, Linkedin, Mail, Code, Zap, Moon } from "lucide-react";

const Footer = () => {
  const socialLinks = useMemo(() => [
    { icon: Github, href: "https://github.com/AuZanPs", label: "GitHub", color: "hover:text-gray-800" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/auzan-putra-siregar-20b2951a6/", label: "LinkedIn", color: "hover:text-blue-600" },
    { icon: Mail, href: "mailto:mauzanps@gmail.com", label: "Email", color: "hover:text-purple-600" },
  ], []);

  const quickLinks = useMemo(() => [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ], []);

  const stats = useMemo(() => [
    { icon: Code, label: "Lines of Code", value: "5K+" },
    { icon: Moon, label: "Hours of Sleep", value: "a few" },
    { icon: Zap, label: "Projects Built", value: "10+" },
  ], []);

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="glass border-t border-white/20 mt-20 relative overflow-hidden">
      {/* Optimized Background Elements - Removed heavy blur effects */}
      <div className="absolute inset-0 bg-gradient-accent opacity-20"></div>
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-xl"></div>
      <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-purple-500/5 rounded-full blur-xl"></div>

      <div className="container-custom py-16 relative z-10">
        {/* Main Footer Grid */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
          {/* Brand Section - Removed floating-element for performance */}
          <div className="lg:col-span-2">
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-3xl font-bold text-gradient-accent mb-4">Frontend Developer</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Passionate about creating intuitive and beautiful digital experiences. I'm shaping my journey as a UI/UX designer, using my frontend skills to bridge the gap between thoughtful design and seamless user interaction.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`glass p-3 rounded-full hover:bg-white/20 transition-colors duration-200 ${link.color}`}
                    aria-label={link.label}
                  >
                    <link.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links - Optimized transitions */}
          <div>
            <div className="glass p-6 rounded-2xl h-full">
              <h4 className="text-lg font-bold text-gradient mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <div className="w-1 h-1 bg-slate-400 rounded-full group-hover:bg-blue-600 transition-colors duration-200"></div>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info - Removed floating animation */}
          <div>
            <div className="glass p-6 rounded-2xl h-full">
              <h4 className="text-lg font-bold text-gradient mb-4">Get In Touch</h4>
              <div className="space-y-3">
                <div className="text-slate-600">
                  <div className="font-medium text-slate-800">Email</div>
                  <div className="text-sm">mauzanps@gmail.com</div>
                </div>
                <div className="text-slate-600">
                  <div className="font-medium text-slate-800">Location</div>
                  <div className="text-sm">Jakarta</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Optimized Stats Section - Removed floating animations */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="glass p-4 rounded-xl text-center hover:bg-white/5 transition-colors duration-200">
              <stat.icon size={24} className="mx-auto mb-2 text-blue-600" />
              <div className="text-xl font-bold text-gradient-accent">{stat.value}</div>
              <div className="text-xs text-slate-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-500 text-sm">
              © {currentYear} Frontend Portfolio. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
