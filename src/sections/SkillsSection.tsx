import { useState, useRef, memo } from "react"
import { useFrame } from "@react-three/fiber"
import { Sphere, Box, Octahedron } from "@react-three/drei"
import { Code, Wrench, Star, Atom, FileCode, Circle, Globe, Link, BookOpen, Flame, Rocket, Waves, Zap, Layers, Bot, Building, Sparkles, Puzzle, MessageCircle, Sprout } from "lucide-react"
import type * as THREE from "three"
import OptimizedCanvas from "../components/OptimizedCanvas"
import { useThrottledFrame } from "../utils/performance"

// 3D Background for Skills
const FloatingSkillsElements = memo(() => {
  const cubeRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const octaRef = useRef<THREE.Mesh>(null);
  
  const throttledFrame = useThrottledFrame((state) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      cubeRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      cubeRef.current.position.y = 1 + Math.sin(state.clock.elapsedTime) * 0.3;
    }
    if (sphereRef.current) {
      sphereRef.current.rotation.z = state.clock.elapsedTime * 0.1;
      sphereRef.current.position.y = -1 + Math.cos(state.clock.elapsedTime * 0.8) * 0.4;
    }
    if (octaRef.current) {
      octaRef.current.rotation.y = state.clock.elapsedTime * 0.25;
      octaRef.current.position.y = 2 + Math.sin(state.clock.elapsedTime * 1.2) * 0.2;
    }
  }, 20);

  useFrame(throttledFrame);

  return (
    <>
      <Box ref={cubeRef} position={[-4, 1, -2]} args={[0.6, 0.6, 0.6]}>
        <meshStandardMaterial color="#60a5fa" wireframe transparent opacity={0.4} />
      </Box>
      <Sphere ref={sphereRef} position={[4, -1, -3]} args={[0.5, 16, 16]}>
        <meshStandardMaterial color="#c084fc" wireframe transparent opacity={0.3} />
      </Sphere>
      <Octahedron ref={octaRef} position={[-3, 2, -1]} args={[0.4]}>
        <meshStandardMaterial color="#f87171" wireframe transparent opacity={0.35} />
      </Octahedron>
      {/* Removed static elements for better performance */}
    </>
  );
});

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState<"hard" | "tools" | "specializations">("hard")

  const skillCategories = {
    hard: [
      { name: "React & Next.js", description: "Building interactive UIs and full-stack apps", icon: <Atom size={24} className="text-blue-500" /> },
      { name: "TypeScript", description: "Type-safe JavaScript development", icon: <FileCode size={24} className="text-blue-600" /> },
      { name: "Node.js (Serverless)", description: "Creating backend functions on Vercel", icon: <Circle size={24} className="text-green-600" /> },
      { name: "Component-Based Architecture", description: "Building scalable and maintainable UIs with React", icon: <Layers size={24} className="text-purple-600" /> },
      { name: "REST APIs", description: "Designing and consuming APIs", icon: <Link size={24} className="text-indigo-600" /> },
      { name: "HTML & CSS", description: "Core web markup and styling", icon: <Globe size={24} className="text-orange-600" /> },
    ],
    tools: [
      { name: "Git & GitHub", description: "Version control and collaboration", icon: <BookOpen size={24} className="text-gray-800" /> },
      { name: "Supabase", description: "Backend-as-a-Service platform", icon: <Flame size={24} className="text-green-500" /> },
      { name: "Vercel", description: "Deployment and hosting platform", icon: <Rocket size={24} className="text-black" /> },
      { name: "Tailwind CSS", description: "Utility-first CSS framework", icon: <Waves size={24} className="text-teal-500" /> },
      { name: "Vite", description: "Next-generation frontend tooling", icon: <Zap size={24} className="text-yellow-500" /> },
      { name: "Three.js", description: "3D graphics and animations", icon: <Layers size={24} className="text-purple-500" /> },
    ],
    specializations: [
      { name: "AI Integration", description: "Using models like Google Gemini AI", icon: <Bot size={24} className="text-green-600" /> },
      { name: "Full-Stack Architecture", description: "Designing and building end-to-end applications", icon: <Building size={24} className="text-gray-700" /> },
      { name: "3D Web Graphics", description: "Creating interactive 3D experiences with Three.js", icon: <Sparkles size={24} className="text-purple-600" /> },
      { name: "Problem Solving", description: "Breaking down complex challenges", icon: <Puzzle size={24} className="text-blue-600" /> },
      { name: "Communication", description: "Clear and effective collaboration", icon: <MessageCircle size={24} className="text-green-600" /> },
      { name: "Adaptability", description: "Learning new technologies quickly", icon: <Sprout size={24} className="text-green-500" /> },
    ],
  }

  const categories = [
    { key: "hard" as const, label: "Hard Skills", icon: Code, color: "from-blue-500/10 to-purple-500/10" },
    { key: "tools" as const, label: "Tools", icon: Wrench, color: "from-blue-500/10 to-purple-500/10" },
    { key: "specializations" as const, label: "Specializations", icon: Star, color: "from-blue-500/10 to-purple-500/10" },
  ]

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* 3D Background */}
      <OptimizedCanvas 
        className="absolute inset-0 opacity-25 -z-10"
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <FloatingSkillsElements />
      </OptimizedCanvas>

      {/* Background gradients */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="container-custom py-16 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">Skills & Technologies</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></div>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Explore the core technologies, specialized skills, and essential tools I use to build modern web applications.
          </p>
        </div>

        {/* Category Toggle Buttons */}
        <div className="flex justify-center mb-12">
          <div className="glass p-2 rounded-2xl inline-flex gap-4">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setActiveCategory(category.key)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeCategory === category.key
                    ? `bg-gradient-to-r ${category.color} shadow-lg scale-105`
                    : "text-slate-600 hover:bg-white/20"
                }`}
              >
                <category.icon size={18} />
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories[activeCategory].map((skill) => (
            <div
              key={skill.name}
              className="glass p-6 rounded-2xl hover:bg-white/30 transition-all duration-300 hover:scale-105 group"
            >
              <div className="flex items-start gap-4">
                <div className="mb-2 group-hover:scale-110 transition-transform duration-300">
                  {skill.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {skill.name}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{skill.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Category Summary */}
        <div className="text-center mt-12">
          <div className="glass p-6 rounded-2xl inline-block">
            <p className="text-slate-600">
              {activeCategory === "hard" &&
                "My core programming languages, frameworks, and technical concepts."}
              {activeCategory === "tools" && "Essential tools and platforms that power my development workflow."}
              {activeCategory === "specializations" && "My key areas of expertise, combining advanced technical skills with professional experience."}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SkillsSection