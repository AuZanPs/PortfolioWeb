"use client"

import { useState } from "react"
import { Code, User, Wrench } from "lucide-react"

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
          <div className="glass p-2 rounded-2xl inline-flex gap-2">
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
