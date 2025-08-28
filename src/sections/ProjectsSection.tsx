// src/sections/ProjectsSection.tsx

import { useRef, memo } from "react";
import { useFrame } from "@react-three/fiber";
import { Box, Sphere, Octahedron } from "@react-three/drei";
import { BrainCircuit, KeyRound, Shirt } from "lucide-react";
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
      title: "Health Care AI chatbot",
      icon: "BrainCircuit",
      description: "Developed an intelligent AI chatbot to provide users with reliable health and medical information, leveraging the Gemini API for context-aware responses.",
      technologies: ["Laravel", "Gemini API", "Prompting"],
    },
        {
      id: 2,
      title: "FitMatch - AI Wardrobe Stylist",
      icon: "Shirt",
      description: "Architected a full-stack, AI-powered wardrobe stylist to provide personalized outfit recommendations. The application leverages Google's Gemini AI for intelligent image analysis and styling suggestions.",
      technologies: ["React (TS)", "Supabase", "Gemini AI"],
    },
    {
      id: 3,
      title: "Password Maker Web Game",
      icon: "KeyRound",
      description: "Built an interactive web-based game that educates users on creating strong, secure passwords. The application provides real-time feedback and clear, visual criteria to help users improve their personal online security habits.",
      technologies: ["HTML", "CSS", "JavaScript"],
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
                {project.icon === "BrainCircuit" && <BrainCircuit size={48} className="text-purple-400/70" />}
                {project.icon === "KeyRound" && <KeyRound size={48} className="text-emerald-400/70" />}
              </div>
              <h3 className="text-2xl font-bold text-gradient-accent mb-4 text-center">{project.title}</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {project.technologies.map((tech) => (
                  <span key={tech} className="glass px-3 py-1 rounded-full text-sm text-slate-700">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
