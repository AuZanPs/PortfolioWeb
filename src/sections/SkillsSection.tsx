// src/sections/SkillsSection.tsx

const SkillsSection = () => {
  const skills = [
    { name: "React", level: 90, color: "from-blue-500 to-blue-600" },
    { name: "TypeScript", level: 85, color: "from-blue-600 to-indigo-600" },
    { name: "Next.js", level: 88, color: "from-gray-800 to-gray-900" },
    { name: "Node.js", level: 75, color: "from-green-500 to-green-600" },
    { name: "Three.js", level: 70, color: "from-purple-500 to-purple-600" },
    { name: "Tailwind CSS", level: 95, color: "from-cyan-500 to-blue-500" },
  ];

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="container-custom py-16 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div key={skill.name} className="glass p-6 rounded-2xl floating-element">
              <div className="flex justify-between items-center mb-3">
                <span className="text-slate-800 font-bold">{skill.name}</span>
                <span className="text-slate-600 text-sm font-medium">{skill.level}%</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-3 mb-2">
                <div
                  className={`bg-gradient-to-r ${skill.color} h-3 rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
              <div className="text-xs text-slate-500">
                {skill.level >= 90 ? "Expert" : skill.level >= 80 ? "Advanced" : skill.level >= 70 ? "Intermediate" : "Learning"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
