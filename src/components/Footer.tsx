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
    { name: "Experience", href: "#experience" },
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
    <footer className="mt-20 relative overflow-hidden" style={{
      borderTop: '1px solid #9290C3',
      background: 'rgba(255, 255, 255, 0.98)',
      boxShadow: '0 -4px 6px -1px rgba(7, 15, 43, 0.1)'
    }}>
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-gradient-accent opacity-30"></div>

      <div className="container-custom py-16 relative z-10">
        {/* Main Footer Grid */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
          {/* Brand Section - Clean minimalistic design */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
              <h3 className="text-3xl font-bold text-gradient-accent mb-4">Frontend Developer</h3>
              <p className="mb-6 leading-relaxed text-gray-600">
                Transforming ideas into exceptional digital experiences.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-3 rounded-full hover:bg-gray-50 transition-colors duration-200 shadow-sm border border-gray-200"
                    style={{color: '#535C91'}}
                    aria-label={link.label}
                  >
                    <link.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links - Clean design */}
          <div>
            <div className="bg-white p-6 rounded-2xl h-full shadow-md border border-gray-200">
              <h4 className="text-lg font-bold text-gradient mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="transition-colors duration-200 flex items-center gap-2 group text-gray-600 hover:text-gray-900"
                    >
                      <div className="w-1 h-1 rounded-full transition-colors duration-200" style={{backgroundColor: '#535C91'}}></div>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info - Clean design */}
          <div>
            <div className="bg-white p-6 rounded-2xl h-full shadow-md border border-gray-200">
              <h4 className="text-lg font-bold text-gradient mb-4">Get In Touch</h4>
              <div className="space-y-3">
                <div>
                  <div className="font-medium" style={{color: '#1B1A55'}}>Email</div>
                  <div className="text-sm text-gray-600">mauzanps@gmail.com</div>
                </div>
                <div>
                  <div className="font-medium" style={{color: '#1B1A55'}}>Location</div>
                  <div className="text-sm text-gray-600">Jakarta, Indonesia</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clean Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-4 rounded-xl text-center hover:bg-gray-50 transition-colors duration-200 shadow-md border border-gray-200">
              <stat.icon size={24} className="mx-auto mb-2" style={{color: '#535C91'}} />
              <div className="text-xl font-bold text-gradient-accent">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8" style={{borderTop: '1px solid #9290C3'}}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">
              © {currentYear} Frontend Portfolio. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
