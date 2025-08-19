// src/sections/ProjectsSection.tsx

import { useState, useRef, memo } from "react";
import { useFrame } from "@react-three/fiber";
import { Box, Sphere, Octahedron } from "@react-three/drei";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  const [currentProject, setCurrentProject] = useState(0);

  const projects = [
    {
      id: 1,
      title: "Health Care AI chatbot",
      description: "i made a health care AI chatbot that can answer questions about health and medical topics, providing reliable information and resources.",
      image: "https://placehold.co/600x400/EEE/31343C?text=AI-Chatbot",
      technologies: ["Laravel", "Gemini API", "Prompting"],
    },
    {
      id: 2,
      title: "3D Animation: Waiting At the Stop",
      description: "I made a 3D animation project that showcases a character waiting at a bus stop, demonstrating my skills in 3D modeling. I made a lot of assets.",
      image: "https://placehold.co/600x400/31343C/EEE?text=3D-Animation",
      technologies: ["Blender", "3D Moddeling", "Assets Creation"],
    },
    {
      id: 3,
      title: "Password Maker Web Game",
      description: "i created a web game that teach you how to make a strong password, helping users improve their online security by providing education how and why is a password is strong enough to use.",
      image: "https://placehold.co/600x400/EEE/31343C?text=Password-Game",
      technologies: ["HTML", "CSS", "JavaScript"],
    },
  ];

  const nextProject = () => setCurrentProject((prev) => (prev + 1) % projects.length);
  const prevProject = () => setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);

  const activeProject = projects[currentProject];

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* 3D Background */}
      <OptimizedCanvas 
        className="absolute inset-0 opacity-30 -z-10"
        camera={{ position: [0, 0, 10], fov: 50 }}
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
