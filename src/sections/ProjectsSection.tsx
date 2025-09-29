// src/sections/ProjectsSection.tsx

import { useRef, memo } from "react";
import { useFrame } from "@react-three/fiber";
import { Box, Sphere, Octahedron } from "@react-three/drei";
import { BrainCircuit, KeyRound, Shirt, ChefHat, Cloud, ExternalLink, Code } from "lucide-react";
import type * as THREE from "three";
import OptimizedCanvas from "../components/OptimizedCanvas";
import { useThrottledFrame } from "../utils/performance";

// 3D Background Components
const FloatingCube = memo(({ position, rotationSpeed }: { position: [number, number, number], rotationSpeed: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const throttledFrame = useThrottledFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * rotationSpeed;
      meshRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed * 0.8;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
    }
  }, 20);

  useFrame(throttledFrame);

  return (
    <Box ref={meshRef} position={position} args={[0.8, 0.8, 0.8]}>
      <meshStandardMaterial color="#60a5fa" wireframe transparent opacity={0.6} />
    </Box>
  );
});

const FloatingSphere = memo(({ position, rotationSpeed }: { position: [number, number, number], rotationSpeed: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const throttledFrame = useThrottledFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * rotationSpeed;
      meshRef.current.rotation.z = state.clock.elapsedTime * rotationSpeed * 0.5;
      meshRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * 0.8 + position[0]) * 0.4;
    }
  }, 20);

  useFrame(throttledFrame);

  return (
    <Sphere ref={meshRef} position={position} args={[0.6, 12, 12]}>
      <meshStandardMaterial color="#c084fc" wireframe transparent opacity={0.5} />
    </Sphere>
  );
});

const FloatingOctahedron = memo(({ position, rotationSpeed }: { position: [number, number, number], rotationSpeed: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const throttledFrame = useThrottledFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed;
      meshRef.current.rotation.z = state.clock.elapsedTime * rotationSpeed * 0.6;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.2 + position[0]) * 0.2;
    }
  }, 20);

  useFrame(throttledFrame);

  return (
    <Octahedron ref={meshRef} position={position} args={[0.7]}>
      <meshStandardMaterial color="#f87171" wireframe transparent opacity={0.4} />
    </Octahedron>
  );
});

const ThreeBackground = memo(() => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      
      {/* Further reduced floating elements for optimal performance */}
      <FloatingCube position={[-4, 2, -2]} rotationSpeed={0.2} />
      <FloatingCube position={[4, -1, -3]} rotationSpeed={0.15} />
      
      <FloatingSphere position={[-3, -2, -1]} rotationSpeed={0.25} />
      
      <FloatingOctahedron position={[-1, 3, -3]} rotationSpeed={0.2} />
    </>
  );
});

const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      title: "FitMatch: AI-Powered Wardrobe Platform",
      icon: "Shirt",
      description: "Achieved an exceptional user experience with a 97.5/100 PageSpeed score and perfect accessibility compliance. Implemented intelligent user features using the Google Gemini API to enhance the outfit discovery and recommendation experience.",
      technologies: ["React", "TypeScript", "Google Gemini API", "Responsive Design", "Accessibility"],
      liveUrl: "https://fitmatch-project-silk.vercel.app/",
      githubUrl: "https://github.com/AuZanPs/FitMatch-project"
    },
    {
      id: 2,
      title: "Recipe Discovery: Accessible Windows 98-Themed App",
      icon: "ChefHat",
      description: "Scored perfect 100/100 accessibility and SEO scores, demonstrating a commitment to user-centered design. Designed a nostalgic Windows 98 aesthetic while maintaining modern usability standards and comprehensive keyboard navigation.",
      technologies: ["HTML5", "CSS3", "JavaScript", "Accessibility", "SEO", "Responsive Design"],
      liveUrl: "https://auzanps.github.io/recipe-discovery-app-98-/",
      githubUrl: "https://github.com/AuZanPs/recipe-discovery-app-98-"
    },
    {
      id: 3,
      title: "Vue Weather Terminal: Retro Console Weather App",
      icon: "Cloud",
      description: "Maintained 99/100 Performance and 95/100 Accessibility scores, showcasing expertise in user experience optimization. Created an intuitive console-style interface that balanced a unique retro aesthetic with modern usability.",
      technologies: ["Vue.js", "CSS3", "Weather API", "Performance Optimization", "UX Design"],
      liveUrl: "https://auzanps.github.io/vue-weather-project/",
      githubUrl: "https://github.com/AuZanPs/vue-weather-project"
    },
  ];

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* 3D Background */}
      <OptimizedCanvas 
        className="absolute inset-0 opacity-30 -z-10"
        camera={{ position: [0, 0, 10], fov: 50 }}
        dpr={[1, 1.5]}
      >
        <ThreeBackground />
      </OptimizedCanvas>
      
      {/* Additional background gradients */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-3/4 left-1/2 w-48 h-48 bg-pink-500/10 rounded-full blur-2xl"></div>

      <div className="container-custom py-16 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="glass p-6 rounded-2xl floating-element">
              <div className="flex justify-center mb-6">
                {project.icon === "Shirt" && <Shirt size={48} className="text-blue-400/70" />}
                {project.icon === "ChefHat" && <ChefHat size={48} className="text-orange-400/70" />}
                {project.icon === "Cloud" && <Cloud size={48} className="text-sky-400/70" />}
                {project.icon === "BrainCircuit" && <BrainCircuit size={48} className="text-purple-400/70" />}
                {project.icon === "KeyRound" && <KeyRound size={48} className="text-emerald-400/70" />}
              </div>
              <h3 className="text-2xl font-bold text-gradient-accent mb-4 text-center">{project.title}</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {project.technologies.map((tech) => (
                  <span key={tech} className="glass px-3 py-1 rounded-full text-sm text-slate-700">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 justify-center">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-105 flex items-center gap-2 group text-sm"
                  >
                    <ExternalLink size={16} className="group-hover:scale-110 transition-transform duration-300" />
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-105 flex items-center gap-2 group text-sm"
                  >
                    <Code size={16} className="group-hover:scale-110 transition-transform duration-300" />
                    Code
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
