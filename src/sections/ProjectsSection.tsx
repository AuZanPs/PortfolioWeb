// src/sections/ProjectsSection.tsx

import { useState } from "react";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";

const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useState(0);

  const projects = [
    {
      id: 1,
      title: "Health Care AI chatbot",
      description: "i made a health care AI chatbot that can answer questions about health and medical topics, providing reliable information and resources.",
      image: "https://placehold.co/600x400/EEE/31343C?text=AI-Chatbot",
      technologies: ["Laravel", "Gemini API", "Prompting"],
      github: "#",
      live: "#",
    },
    {
      id: 2,
      title: "3D Animation: Waiting At the Stop",
      description: "I made a 3D animation project that showcases a character waiting at a bus stop, demonstrating my skills in 3D modeling. I made a lot of assets.",
      image: "https://placehold.co/600x400/31343C/EEE?text=3D-Animation",
      technologies: ["Blender", "3D Moddeling", "Assets Creation"],
      github: "#",
      live: "#",
    },
    {
      id: 3,
      title: "Password Maker Web Game",
      description: "i created a web game that teach you how to make a strong password, helping users improve their online security by providing education how and why is a password is strong enough to use.",
      image: "https://placehold.co/600x400/EEE/31343C?text=Password-Game",
      technologies: ["HTML", "CSS", "JavaScript"],
      github: "#",
      live: "#",
    },
  ];

  const nextProject = () => setCurrentProject((prev) => (prev + 1) % projects.length);
  const prevProject = () => setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);

  const activeProject = projects[currentProject];

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="container-custom py-16 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
        </div>

        <div className="glass p-8 rounded-2xl floating-element relative">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="glass p-4 rounded-2xl">
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="rounded-xl w-full h-auto object-cover"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gradient-accent mb-4">{activeProject.title}</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">{activeProject.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {activeProject.technologies.map((tech) => (
                  <span key={tech} className="glass px-3 py-1 rounded-full text-sm text-slate-700">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a href={activeProject.github} className="glass px-6 py-3 rounded-full font-semibold hover:bg-white/50 transition-all duration-300 flex items-center gap-2 floating-element">
                  <Github size={18} /> Code
                </a>
                <a href={activeProject.live} className="glass px-6 py-3 rounded-full font-semibold hover:bg-white/50 transition-all duration-300 flex items-center gap-2 floating-element">
                  <ExternalLink size={18} /> Live Demo
                </a>
              </div>
            </div>
          </div>
          
          <button onClick={prevProject} aria-label="Previous project" className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 glass p-3 rounded-full hover:bg-white/50 floating-element">
            <ChevronLeft size={20} />
          </button>
          {/* --- FIX IS HERE --- */}
          <button onClick={nextProject} aria-label="Next project" className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 glass p-3 rounded-full hover:bg-white/50 floating-element">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Project Navigation Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentProject(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentProject ? "bg-blue-600" : "bg-white/50"
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
