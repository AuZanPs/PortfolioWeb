// src/sections/AboutSection.tsx

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Torus, Box, Octahedron } from "@react-three/drei";
import { Code, Palette, Zap, Users } from "lucide-react";
import type * as THREE from "three";

const IntertwinedRings = () => {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });
  return (
    <group ref={groupRef}>
      <Torus args={[2, 0.1, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#60a5fa" wireframe />
      </Torus>
      <Torus args={[2, 0.1, 16, 100]} rotation={[Math.PI / 2, Math.PI / 3, 0]}>
        <meshStandardMaterial color="#c084fc" wireframe />
      </Torus>
      <Torus args={[2, 0.1, 16, 100]} rotation={[Math.PI / 2, -Math.PI / 3, 0]}>
        <meshStandardMaterial color="#f87171" wireframe />
      </Torus>
    </group>
  );
};

// Additional floating elements for About section
const FloatingGeometry = () => {
  const cubeRef = useRef<THREE.Mesh>(null);
  const octaRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      cubeRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      cubeRef.current.position.y = 3 + Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
    }
    if (octaRef.current) {
      octaRef.current.rotation.z = state.clock.elapsedTime * 0.12;
      octaRef.current.position.y = -3 + Math.cos(state.clock.elapsedTime * 0.6) * 0.2;
    }
  });

  return (
    <>
      <Box ref={cubeRef} position={[-5, 3, -3]} args={[0.5, 0.5, 0.5]}>
        <meshStandardMaterial color="#60a5fa" wireframe transparent opacity={0.3} />
      </Box>
      <Octahedron ref={octaRef} position={[5, -3, -2]} args={[0.4]}>
        <meshStandardMaterial color="#f87171" wireframe transparent opacity={0.25} />
      </Octahedron>
      <Box position={[-4, -2, -4]} args={[0.3, 0.3, 0.3]}>
        <meshStandardMaterial color="#c084fc" wireframe transparent opacity={0.2} />
      </Box>
    </>
  );
};

const AboutSection = () => {
  const highlights = [
    { icon: Code, title: "Simple Code", description: "Writing simplistic, time-efficient, and easy-to-use code." },
    { icon: Palette, title: "UI/UX Design", description: "Creating beautiful and intuitive user interfaces." },
    { icon: Zap, title: "Performance", description: "Optimizing for speed and a great user experience." },
    { icon: Users, title: "Collaboration", description: "Working effectively in teams." },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 -z-10">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <IntertwinedRings />
          <FloatingGeometry />
        </Canvas>
      </div>

      {/* Additional background gradients */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="glass p-8 rounded-2xl floating-element h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10">
            <h3 className="text-2xl font-bold text-gradient-accent mb-4">My Journey</h3>
            <p className="text-slate-600 mb-4 leading-relaxed">
              I'm at the beginning of my journey as a UI/UX designer, excited to shape how people interact with technology. I am dedicated to learning the principles of user-centered design and am currently honing my skills in creating effective and elegant solutions. With a background in frontend technologies, I bring a practical understanding of what it takes to bring a design to life on the web.
            </p>
            <p className="text-slate-600 leading-relaxed">
              I thrive in collaborative environments and am always eager to learn from experienced mentors and peers. My goal is to apply my growing skill set to meaningful projects, continuously pushing my creative boundaries to build products that are not only beautiful but also intuitive and accessible to all users.            </p>
          </div>

          <div className="grid gap-4">
            {highlights.map((item, index) => (
              <div
                key={item.title}
                className="glass p-6 rounded-2xl floating-element bg-gradient-to-br from-white/60 to-white/40"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="glass p-3 rounded-xl bg-white/50">
                    <item.icon size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">{item.title}</h4>
                    <p className="text-slate-600 text-sm">{item.description}</p>
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