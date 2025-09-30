// src/sections/AboutSection.tsx

import { Code, Palette, Zap, Users } from "lucide-react";

const AboutSection = () => {
  const highlights = [
    { icon: Code, title: "Clean & Scalable Code", description: "Writing maintainable, efficient code that's built to last." },
    { icon: Palette, title: "UI/UX Design", description: "Crafting beautiful, intuitive interfaces that users love." },
    { icon: Zap, title: "Performance", description: "Delivering fast, optimized experiences that exceed expectations." },
    { icon: Users, title: "Collaboration", description: "Thriving in team environments and cross-functional projects." },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-white">
      {/* Subtle Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-3" style={{background: 'radial-gradient(circle, #1B1A55 0%, transparent 70%)'}}></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-3" style={{background: 'radial-gradient(circle, #9290C3 0%, transparent 70%)'}}></div>

      <div className="container-custom">
        <div className="text-center mb-12 sm:mb-16 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-4">About Me</h2>
          <div className="w-24 h-1 mx-auto" style={{background: 'linear-gradient(to right, #535C91, #9290C3)'}}></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center px-4">
          <div className="bg-white p-5 sm:p-6 md:p-8 rounded-2xl h-full shadow-lg border border-gray-200">
            <h3 className="text-xl sm:text-2xl font-bold text-gradient-accent mb-3 sm:mb-4">Professional Summary</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Frontend Developer passionate about creating exceptional user experiences through modern React and TypeScript development. I specialize in translating design concepts into high-performance, accessible web applications with innovative features like AI-powered recommendations. With proven expertise in optimization—achieving 97.5/100 PageSpeed scores and implementing WCAG-compliant interfaces—I'm seeking a Frontend Developer internship with UI/UX growth opportunities at a leading Indonesian tech company.
            </p>
          </div>

          <div className="grid gap-3 sm:gap-4">
            {highlights.map((item, index) => (
              <div
                key={item.title}
                className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 rounded-xl shadow-sm border border-gray-200 flex-shrink-0" style={{backgroundColor: '#F8F9FA'}}>
                    <item.icon size={20} className="sm:w-6 sm:h-6" style={{color: '#535C91'}} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold mb-1 text-sm sm:text-base" style={{color: '#070F2B'}}>{item.title}</h4>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;