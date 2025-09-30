import { useState } from "react"
import { Code, Wrench, Star } from "lucide-react"

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState<"frontend" | "uiux" | "optimization" | "state" | "testing">("frontend")

  const skillCategories = {
    frontend: [
      { name: "React & TypeScript", description: "Modern component-based development with type safety", icon: Code },
      { name: "HTML5 & CSS3", description: "Semantic markup and advanced styling techniques", icon: Code },
      { name: "JavaScript ES6+", description: "Modern JavaScript features and best practices", icon: Code },
      { name: "Responsive Design", description: "Mobile-first and cross-device compatibility", icon: Code },
      { name: "Component Architecture", description: "Scalable and maintainable UI components", icon: Code },
      { name: "RESTful API Integration", description: "Seamless backend communication", icon: Code },
    ],
    uiux: [
      { name: "Figma", description: "UI/UX design and prototyping", icon: Wrench },
      { name: "Adobe Creative Suite", description: "Photoshop, Illustrator for design assets", icon: Wrench },
      { name: "Wireframing", description: "User flow and interface planning", icon: Wrench },
      { name: "Design Systems", description: "Consistent component libraries", icon: Wrench },
      { name: "User Research", description: "Understanding user needs and behaviors", icon: Wrench },
      { name: "Prototyping", description: "Interactive mockups and user testing", icon: Wrench },
    ],
    optimization: [
      { name: "PageSpeed Optimization", description: "Achieving 97.5/100 PageSpeed scores", icon: Star },
      { name: "WCAG Compliance", description: "100% accessibility compliance implementation", icon: Star },
      { name: "ARIA Implementation", description: "Screen reader and assistive technology support", icon: Star },
      { name: "Performance Monitoring", description: "Core Web Vitals and user experience metrics", icon: Star },
      { name: "SEO Best Practices", description: "Search engine optimization techniques", icon: Star },
      { name: "Cross-browser Testing", description: "Ensuring compatibility across platforms", icon: Star },
    ],
    state: [
      { name: "React Hooks", description: "Modern state management with hooks", icon: Code },
      { name: "Context API", description: "Global state management in React", icon: Code },
      { name: "Supabase", description: "Backend-as-a-Service integration", icon: Code },
      { name: "Local Storage", description: "Client-side data persistence", icon: Code },
      { name: "Form Validation", description: "User input handling and validation", icon: Code },
      { name: "API State Management", description: "Handling async data and loading states", icon: Code },
    ],
    testing: [
      { name: "Manual Testing", description: "Comprehensive user experience testing", icon: Wrench },
      { name: "Cross-device Testing", description: "Mobile, tablet, and desktop compatibility", icon: Wrench },
      { name: "Accessibility Testing", description: "Screen reader and keyboard navigation testing", icon: Wrench },
      { name: "Performance Testing", description: "Load times and optimization validation", icon: Wrench },
      { name: "User Acceptance Testing", description: "Client feedback integration and validation", icon: Wrench },
      { name: "Browser Compatibility", description: "Testing across different browsers and versions", icon: Wrench },
    ],
  }

  const categories = [
    { key: "frontend" as const, label: "Frontend & UI", icon: Code, color: "from-blue-500/10 to-purple-500/10" },
    { key: "uiux" as const, label: "UI/UX Design", icon: Wrench, color: "from-blue-500/10 to-purple-500/10" },
    { key: "optimization" as const, label: "UX Optimization", icon: Star, color: "from-blue-500/10 to-purple-500/10" },
    { key: "state" as const, label: "State Management", icon: Code, color: "from-blue-500/10 to-purple-500/10" },
    { key: "testing" as const, label: "Testing & QA", icon: Wrench, color: "from-blue-500/10 to-purple-500/10" },
  ]

  return (
    <section id="skills" className="py-20 relative overflow-hidden bg-white">
      {/* Subtle Background Elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full opacity-3" style={{background: 'radial-gradient(circle, #9290C3 0%, transparent 70%)'}}></div>
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full opacity-3" style={{background: 'radial-gradient(circle, #1B1A55 0%, transparent 70%)'}}></div>

      <div className="container-custom py-16 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">Skills & Technologies</h2>
          <div className="w-24 h-1 mx-auto mb-6" style={{background: 'linear-gradient(to right, #535C91, #9290C3)'}}></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore the technologies, skills, and tools I use to build modern, accessible web applications.
          </p>
        </div>

        {/* Category Toggle Buttons */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-2 rounded-2xl inline-flex gap-4 shadow-lg border border-gray-200">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setActiveCategory(category.key)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeCategory === category.key
                    ? "shadow-lg scale-105"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                style={activeCategory === category.key ? {backgroundColor: '#535C91', color: 'white'} : {}}
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
              className="bg-white p-6 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 group shadow-lg border border-gray-200"
            >
              <div className="flex items-start gap-4">
                <div className="mb-2 group-hover:scale-110 transition-transform duration-300">
                  <skill.icon size={24} style={{color: '#535C91'}} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2 transition-colors duration-300" style={{color: '#070F2B'}}>
                    {skill.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{skill.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Category Summary */}
        <div className="text-center mt-12">
          <div className="bg-white p-6 rounded-2xl inline-block shadow-lg border border-gray-200">
            <p className="text-gray-600">
              {activeCategory === "frontend" &&
                "Core technologies and frameworks for building modern, responsive web applications."}
              {activeCategory === "uiux" && "Design tools and methodologies for creating intuitive user experiences."}
              {activeCategory === "optimization" && "Performance and accessibility techniques that deliver exceptional user experiences."}
              {activeCategory === "state" && "Data management and application state handling approaches."}
              {activeCategory === "testing" && "Quality assurance practices that ensure reliable, accessible applications."}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
