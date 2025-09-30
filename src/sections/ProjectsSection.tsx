// src/sections/ProjectsSection.tsx

import { Sparkles, UtensilsCrossed, CloudRain, ExternalLink, Github as GithubIcon } from "lucide-react";

const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      title: "FitMatch: AI-Powered Wardrobe Platform",
      icon: "Sparkles",
      description: "Architected a full-stack, AI-powered wardrobe stylist that provides personalized outfit recommendations. The application leverages Google's Gemini AI for intelligent image analysis and styling suggestions, achieving a 97.5/100 PageSpeed score.",
      technologies: ["React", "TypeScript", "Supabase", "Gemini AI", "Responsive Design"],
      liveDemo: "https://fitmatch-project-silk.vercel.app/",
      github: "https://github.com/AuZanPs/Fitmatch-project"
    },
    {
      id: 2,
      title: "Recipe Discovery: Accessible Windows 98-Themed App",
      icon: "UtensilsCrossed",
      description: "Developed a nostalgic Windows 98-themed recipe discovery application with full WCAG compliance and accessibility features. Implemented semantic HTML, ARIA labels, and keyboard navigation for an inclusive user experience.",
      technologies: ["React", "TypeScript", "WCAG", "Semantic HTML", "ARIA"],
      liveDemo: "https://auzanps.github.io/recipe-discovery-app-98-/",
      github: "https://github.com/AuZanPs/recipe-discovery-app-98-"
    },
    {
      id: 3,
      title: "Vue Weather Terminal: Retro Console Weather App",
      icon: "CloudRain",
      description: "Built a retro terminal-style weather application using Vue.js with command-line interface aesthetics. Features real-time weather data integration and responsive design, optimized for modern web standards.",
      technologies: ["Vue.js", "JavaScript", "Weather API", "Terminal UI", "Responsive Design"],
      liveDemo: "https://auzanps.github.io/vue-weather-project/",
      github: "https://github.com/AuZanPs/vue-weather-project"
    },
  ];

  return (
    <section id="projects" className="py-20 relative overflow-hidden bg-white">
      {/* Subtle Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-3" style={{background: 'radial-gradient(circle, #535C91 0%, transparent 70%)'}}></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-3" style={{background: 'radial-gradient(circle, #070F2B 0%, transparent 70%)'}}></div>

      <div className="container-custom py-16 relative z-10">
        <div className="text-center mb-8 sm:mb-12 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-4">
            Projects
          </h2>
          <div className="w-24 h-1 mx-auto" style={{background: 'linear-gradient(to right, #1B1A55, #9290C3)'}}></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4">
          {projects.map((project, index) => {
            // Define unique colors for each project using the navy blue palette
            const iconColors = ['#070F2B', '#1B1A55', '#535C91'];
            const iconColor = iconColors[index % iconColors.length];

            return (
              <div key={project.id} className="bg-white p-5 sm:p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-center mb-4 sm:mb-6">
                  {project.icon === "Sparkles" && <Sparkles size={40} className="sm:w-12 sm:h-12" style={{color: iconColor}} />}
                  {project.icon === "UtensilsCrossed" && <UtensilsCrossed size={40} className="sm:w-12 sm:h-12" style={{color: iconColor}} />}
                  {project.icon === "CloudRain" && <CloudRain size={40} className="sm:w-12 sm:h-12" style={{color: iconColor}} />}
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gradient-accent mb-3 sm:mb-4 text-center">{project.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 justify-center mb-4 sm:mb-6">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm shadow-sm border border-gray-200" style={{backgroundColor: '#F8F9FA', color: '#535C91'}}>
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 hover:bg-gray-50 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                    style={{borderColor: '#535C91', color: '#070F2B'}}
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 hover:bg-gray-50 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                    style={{borderColor: '#535C91', color: '#070F2B'}}
                  >
                    <GithubIcon size={16} />
                    GitHub
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
