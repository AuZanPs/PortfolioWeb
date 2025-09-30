import { useState } from "react"
import { Code, Wrench, Star, Database } from "lucide-react"

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState<"frontend" | "uiux" | "optimization" | "state" | "testing">("frontend")

  const skillCategories = {
    frontend: [
      { name: "React & TypeScript", description: "Modern component-based development with type safety", icon: Code },
      { name: "JavaScript (ES6+)", description: "Modern JavaScript features and best practices", icon: Code },
      { name: "HTML5 & CSS3", description: "Semantic markup and advanced styling techniques", icon: Code },
      { name: "Next.js", description: "React framework for production applications", icon: Code },
      { name: "Responsive Design", description: "Mobile-first and cross-device compatibility", icon: Code },
      { name: "Component Architecture", description: "Scalable and maintainable UI components", icon: Code },
    ],
    uiux: [
      { name: "Figma", description: "UI/UX design and prototyping tool", icon: Wrench },
      { name: "Design Systems", description: "Consistent component libraries and patterns", icon: Wrench },
      { name: "User Research", description: "Understanding user needs and behaviors", icon: Wrench },
      { name: "Prototyping", description: "Interactive mockups and user testing", icon: Wrench },
      { name: "Design-to-Code", description: "Translating designs into functional code", icon: Wrench },
      { name: "Tailwind CSS", description: "Utility-first CSS framework for rapid development", icon: Wrench },
    ],
    optimization: [
      { name: "Web Accessibility", description: "Inclusive design for all users with disabilities", icon: Star },
      { name: "Performance Engineering", description: "Optimizing load times and Core Web Vitals", icon: Star },
      { name: "Responsive Design", description: "Adaptive layouts across all devices", icon: Star },
      { name: "Cross-Browser Testing", description: "Ensuring compatibility across platforms", icon: Star },
      { name: "SEO Best Practices", description: "Search engine optimization and meta tags", icon: Star },
      { name: "Progressive Web Apps", description: "Building offline-capable web applications", icon: Star },
    ],
    state: [
      { name: "TanStack Query", description: "Server state management and data caching", icon: Database },
      { name: "Redux", description: "Predictable state container for JavaScript apps", icon: Database },
      { name: "Context API", description: "React's built-in state management solution", icon: Database },
      { name: "RESTful APIs", description: "HTTP-based API integration and consumption", icon: Database },
      { name: "Git & Version Control", description: "Collaborative development and code management", icon: Database },
      { name: "Supabase & PostgreSQL", description: "Backend services and database management", icon: Database },
    ],
    testing: [
      { name: "Jest", description: "JavaScript testing framework for unit tests", icon: Wrench },
      { name: "React Testing Library", description: "Testing React components and user interactions", icon: Wrench },
      { name: "Agile/Scrum", description: "Iterative development and sprint planning", icon: Wrench },
      { name: "Cross-Device Testing", description: "Mobile, tablet, and desktop compatibility", icon: Wrench },
      { name: "Accessibility Testing", description: "Screen reader and keyboard navigation testing", icon: Wrench },
      { name: "Performance Testing", description: "Load times and optimization validation", icon: Wrench },
    ],
  }

  const categories = [
    { key: "frontend" as const, label: "Frontend & UI", icon: Code, color: "from-blue-500/10 to-purple-500/10" },
    { key: "uiux" as const, label: "UI/UX Design", icon: Wrench, color: "from-blue-500/10 to-purple-500/10" },
    { key: "optimization" as const, label: "UX Optimization", icon: Star, color: "from-blue-500/10 to-purple-500/10" },
    { key: "state" as const, label: "State Management", icon: Database, color: "from-blue-500/10 to-purple-500/10" },
    { key: "testing" as const, label: "Testing & QA", icon: Wrench, color: "from-blue-500/10 to-purple-500/10" },
  ]

  return (
    <section id="skills" className="py-20 relative overflow-hidden bg-white">
      {/* Subtle Background Elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full opacity-3" style={{background: 'radial-gradient(circle, #9290C3 0%, transparent 70%)'}}></div>
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full opacity-3" style={{background: 'radial-gradient(circle, #1B1A55 0%, transparent 70%)'}}></div>

      <div className="container-custom py-16 relative z-10">
        <div className="text-center mb-8 sm:mb-12 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-4">Skills & Technologies</h2>
          <div className="w-24 h-1 mx-auto mb-6" style={{background: 'linear-gradient(to right, #535C91, #9290C3)'}}></div>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Explore the technologies, skills, and tools I use to build modern, accessible web applications.
          </p>
        </div>

        {/* Category Toggle Buttons - Single Row on Desktop */}
        <div className="flex justify-center mb-8 sm:mb-12 px-4">
          <div className="bg-white p-2 rounded-2xl inline-flex gap-2 sm:gap-3 md:gap-4 shadow-lg border border-gray-200 overflow-x-auto max-w-full">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setActiveCategory(category.key)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-300 text-xs sm:text-sm md:text-base whitespace-nowrap flex-shrink-0 ${
                  activeCategory === category.key
                    ? "shadow-lg scale-105"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                style={activeCategory === category.key ? {backgroundColor: '#535C91', color: 'white'} : {}}
              >
                <category.icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4">
          {skillCategories[activeCategory].map((skill) => (
            <div
              key={skill.name}
              className="bg-white p-4 sm:p-6 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 group shadow-lg border border-gray-200"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="mb-2 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                  <skill.icon size={20} className="sm:w-6 sm:h-6" style={{color: '#535C91'}} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2 transition-colors duration-300" style={{color: '#070F2B'}}>
                    {skill.name}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{skill.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Category Summary */}
        <div className="text-center mt-8 sm:mt-12 px-4">
          <div className="bg-white p-4 sm:p-6 rounded-2xl inline-block shadow-lg border border-gray-200 max-w-2xl">
            <p className="text-xs sm:text-sm md:text-base text-gray-600">
              {activeCategory === "frontend" &&
                "Core technologies and frameworks for building modern, scalable, and production-ready web applications."}
              {activeCategory === "uiux" && "Design tools and methodologies for creating intuitive, user-centered digital experiences."}
              {activeCategory === "optimization" && "Performance, accessibility, and SEO techniques that deliver exceptional user experiences across all platforms."}
              {activeCategory === "state" && "State management solutions, API integration, and version control for robust application development."}
              {activeCategory === "testing" && "Quality assurance practices and testing frameworks that ensure reliable, accessible applications."}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
