// src/sections/HeroSection.tsx

import { useRef } from "react";
import type React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Box, Octahedron } from "@react-three/drei";
import { ArrowDown, Code } from "lucide-react";
import type * as THREE from "three";

const AnimatedSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial
        color="#3b82f6"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0.4}
        metalness={0.8}
      />
    </Sphere>
  );
};

// Additional floating elements for Hero
const FloatingCube = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.3;
    }
  });

  return (
    <Box ref={meshRef} position={position} args={[0.4, 0.4, 0.4]}>
      <meshStandardMaterial color="#60a5fa" wireframe transparent opacity={0.4} />
    </Box>
  );
};

const FloatingOctahedron = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.12;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.08;
      meshRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * 0.6 + position[0]) * 0.2;
    }
  });

  return (
    <Octahedron ref={meshRef} position={position} args={[0.3]}>
      <meshStandardMaterial color="#c084fc" wireframe transparent opacity={0.3} />
    </Octahedron>
  );
};

const HeroSection = () => {
  // The smooth scroll handler function, copied from the Navbar
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault(); // Prevent the default anchor jump
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background 3D Element */}
      <div className="absolute inset-0 opacity-20">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <AnimatedSphere />
          
          {/* Additional floating elements */}
          <FloatingCube position={[-3, 2, -1]} />
          <FloatingCube position={[3, -1, -2]} />
          <FloatingOctahedron position={[-2, -2, 1]} />
          <FloatingOctahedron position={[2, 3, 0]} />
          <FloatingOctahedron position={[4, 1, -3]} />
        </Canvas>
      </div>

      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10">
        <div className="text-center">
          <div className="glass p-8 md:p-12 rounded-3xl gap-10 floating-element max-w-4xl mx-auto">
            {/* Badge */}

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gradient mb-15">
              Muhammad Auzan
              <span className="block text-gradient-accent">Putra Siregar</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-15 max-w-2xl mx-auto leading-relaxed">
            Passionate about creating intuitive and beautiful digital experiences. I'm shaping my journey as a UI/UX designer, using my frontend skills to bridge the gap between thoughtful design and seamless user interaction.      
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#projects"
                onClick={(e) => handleSmoothScroll(e, "#projects")} // Updated onClick
                className="glass px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-105 flex items-center gap-2 group"
              >
                <Code size={20} className="group-hover:scale-110 transition-transform duration-300" />
                View My Work
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="glass p-3 rounded-full">
          <ArrowDown size={20} className="text-slate-600" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
