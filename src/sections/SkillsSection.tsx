import { useState, useRef, memo } from "react"
import { useFrame } from "@react-three/fiber"
import { Sphere, Box, Octahedron } from "@react-three/drei"
import { Code, User, Wrench } from "lucide-react"
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
  const [activeCategory, setActiveCategory] = useState<"hard" | "soft" | "tools">("hard")

  const skillCategories = {
    hard: [
      { name: "React", description: "Building interactive user interfaces", icon: "⚛️" },
      { name: "TypeScript", description: "Type-safe JavaScript development", icon: "🔷" },
      { name: "Next.js", description: "Full-stack React framework", icon: "▲" },
      { name: "JavaScript", description: "Core web programming language", icon: "🟨" },
      { name: "HTML/CSS", description: "Web markup and styling", icon: "🌐" },
      { name: "Node.js", description: "Server-side JavaScript runtime", icon: "🟢" },
    ],
    soft: [
      { name: "Problem Solving", description: "Breaking down complex challenges", icon: "🧩" },
      { name: "Communication", description: "Clear and effective collaboration", icon: "💬" },
      { name: "Adaptability", description: "Learning new technologies quickly", icon: "🔄" },
      { name: "Team Work", description: "Collaborative development approach", icon: "👥" },
      { name: "Time Management", description: "Meeting deadlines efficiently", icon: "⏰" },
      { name: "Critical Thinking", description: "Analytical approach to development", icon: "🎯" },
    ],
    tools: [
      { name: "VS Code", description: "Primary code editor", icon: "💻" },
      { name: "Git & GitHub", description: "Version control and collaboration", icon: "📚" },
      { name: "Figma", description: "UI/UX design and prototyping", icon: "🎨" },
      { name: "Tailwind CSS", description: "Utility-first CSS framework", icon: "🌊" },
      { name: "Three.js", description: "3D graphics and animations", icon: "🎲" },
      { name: "Vercel", description: "Deployment and hosting platform", icon: "🚀" },
    ],
  }

  const categories = [
    { key: "hard" as const, label: "Hard Skills", icon: Code, color: "from-blue-500/10 to-purple-500/10" },
    { key: "soft" as const, label: "Soft Skills", icon: User, color: "from-blue-500/10 to-purple-500/10" },
    { key: "tools" as const, label: "Tools", icon: Wrench, color: "from-blue-500/10 to-purple-500/10" },
  ]

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* 3D Background */}
      <OptimizedCanvas 
        className="absolute inset-0 opacity-25 -z-10"
        camera={{ position: [0, 0, 8], fov: 50 }}
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
            Here's an overview of my technical expertise, interpersonal abilities, and the tools I use to bring ideas to
            life.
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
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
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
                "skills i've learned along the way"}
              {activeCategory === "soft" && "Personal qualities that help me work effectively and grow as a developer."}
              {activeCategory === "tools" && "Essential tools and platforms that power my development workflow."}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
