// src/sections/AboutSection.tsx

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Torus } from "@react-three/drei";
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

const AboutSection = () => {
  const highlights = [
    { icon: Code, title: "Clean Code", description: "Writing maintainable, scalable, and efficient code." },
    { icon: Palette, title: "UI/UX Design", description: "Creating beautiful and intuitive user interfaces." },
    { icon: Zap, title: "Performance", description: "Optimizing for speed and a great user experience." },
    { icon: Users, title: "Collaboration", description: "Working effectively in teams and with stakeholders." },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 -z-10">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <IntertwinedRings />
        </Canvas>
      </div>

      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="glass p-8 rounded-2xl floating-element h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10">
            <h3 className="text-2xl font-bold text-gradient-accent mb-4">My Journey</h3>
            <p className="text-slate-600 mb-4 leading-relaxed">
              I'm a passionate Frontend Developer creating exceptional digital experiences. My journey started with a curiosity about how websites work, and it has evolved into a career focused on building innovative, user-centered solutions.
            </p>
            <p className="text-slate-600 leading-relaxed">
              I specialize in React, TypeScript, and modern CSS frameworks, with a keen eye for design and performance.
            </p>
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