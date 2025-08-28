// src/sections/ExperienceSection.tsx

import { useRef, memo } from "react";
import { useFrame } from "@react-three/fiber";
import { Box, Sphere, Octahedron } from "@react-three/drei";
import { Users, MonitorSmartphone, Gamepad2 } from "lucide-react";
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

const ExperienceSection = () => {
  const experience = {
    title: "The Cyber Game: An Educational Security Game for Icon+",
    role: "Project Lead (Frontend & Game Design Focus)",
    summary: "I led a 10-person team in developing \"The Cyber Game,\" a gamified web platform designed to make learning about cybersecurity engaging and interactive for the employees of Icon+, a subsidiary of Indonesia's state electricity company (PLN). The project successfully transformed traditional training into an immersive learning experience.",
    contributions: [
      {
        icon: "Users",
        title: "Project Leadership",
        description: "Guided a 10-person team from client meetings to final delivery, translating feedback into key game design decisions."
      },
      {
        icon: "MonitorSmartphone",
        title: "Frontend & UI/UX",
        description: "Oversaw the creation of a responsive and accessible interface using HTML, CSS, & JavaScript with a clean, corporate-friendly aesthetic."
      },
      {
        icon: "Gamepad2",
        title: "Game Design & Prototyping",
        description: "Directed the integration of game mechanics with educational content, using Unity to prototype complex interactions and ensure an engaging experience."
      }
    ],
    technologies: ["Golang", "MySQL", "JavaScript", "HTML", "CSS", "Unity"],
  };

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
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
            Professional Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
        </div>

        <div className="glass p-8 rounded-2xl floating-element relative max-w-3xl mx-auto">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gradient-accent mb-4">{experience.title}</h3>
            <div className="mb-6">
              <p className="font-bold text-slate-700">
                {experience.role}
              </p>
            </div>
          </div>
          
          <div className="mt-8">
            <p className="text-slate-600 mb-8 leading-relaxed text-center">{experience.summary}</p>
            
            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-4 text-center">Key Contributions:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {experience.contributions.map((contribution, index) => (
                  <div key={index} className="glass p-6 rounded-xl flex flex-col items-center text-center">
                    <div className="mb-4 text-blue-500">
                      {contribution.icon === "Users" && <Users size={40} />}
                      {contribution.icon === "MonitorSmartphone" && <MonitorSmartphone size={40} />}
                      {contribution.icon === "Gamepad2" && <Gamepad2 size={40} />}
                    </div>
                    <h5 className="text-lg font-semibold mb-3 text-gradient-accent">{contribution.title}</h5>
                    <p className="text-slate-600 text-sm">{contribution.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-2">
              <h4 className="text-xl font-semibold mb-4 text-center">Tech Stack</h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {experience.technologies.map((tech) => (
                  <span key={tech} className="glass px-3 py-1 rounded-full text-sm text-slate-700 mb-2">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;