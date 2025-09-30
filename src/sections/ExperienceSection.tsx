// src/sections/ExperienceSection.tsx

import { Users, MonitorSmartphone, Gamepad2 } from "lucide-react";



const ExperienceSection = () => {
  const experience = {
    title: "Project Lead – PLN Icon Plus",
    role: "January 2025 – April 2025",
    summary: "Led development of \"The Cyber Game,\" a web-based cybersecurity training application for PLN Icon Plus, collaborating within a cross-functional team environment.",
    contributions: [
      {
        icon: "Users",
        title: "Team Collaboration",
        description: "Collaborated with a 10-person cross-functional team over 4 months to deliver \"The Cyber Game,\" a comprehensive cybersecurity training platform for PLN Icon Plus."
      },
      {
        icon: "MonitorSmartphone",
        title: "Accessibility & UI/UX",
        description: "Engineered user-friendly, ARIA-compliant interface components, achieving 100% accessibility compliance for the corporate training environment."
      },
      {
        icon: "Gamepad2",
        title: "Client Coordination",
        description: "Coordinated team responses to client feedback, ensuring UI/UX improvements aligned with user needs and were delivered within the project timeline."
      }
    ],
    technologies: ["React", "TypeScript", "Golang", "RESTful API", "ARIA", "Responsive Design"],
    additionalInfo: "Successfully integrated a responsive frontend with Golang RESTful API, delivering secure authentication and session management features for 500+ potential corporate users."
  };

  return (
    <section id="experience" className="py-20 relative overflow-hidden bg-white">
      {/* Subtle Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-3" style={{background: 'radial-gradient(circle, #070F2B 0%, transparent 70%)'}}></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-3" style={{background: 'radial-gradient(circle, #535C91 0%, transparent 70%)'}}></div>

      <div className="container-custom py-16 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Professional Experience
          </h2>
          <div className="w-24 h-1 mx-auto" style={{background: 'linear-gradient(to right, #070F2B, #535C91)'}}></div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 relative max-w-3xl mx-auto">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gradient-accent mb-4">{experience.title}</h3>
            <div className="mb-6">
              <p className="font-bold" style={{color: '#1B1A55'}}>
                {experience.role}
              </p>
            </div>
          </div>
          
          <div className="mt-8">
            <p className="text-gray-600 mb-8 leading-relaxed text-center">{experience.summary}</p>

            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-4 text-center" style={{color: '#070F2B'}}>Key Contributions:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {experience.contributions.map((contribution, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl flex flex-col items-center text-center shadow-md border border-gray-200">
                    <div className="mb-4" style={{color: '#535C91'}}>
                      {contribution.icon === "Users" && <Users size={40} />}
                      {contribution.icon === "MonitorSmartphone" && <MonitorSmartphone size={40} />}
                      {contribution.icon === "Gamepad2" && <Gamepad2 size={40} />}
                    </div>
                    <h5 className="text-lg font-semibold mb-3 text-gradient-accent">{contribution.title}</h5>
                    <p className="text-gray-600 text-sm">{contribution.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-xl font-semibold mb-4 text-center" style={{color: '#070F2B'}}>Key Achievement</h4>
              <p className="text-gray-600 text-center leading-relaxed">{experience.additionalInfo}</p>
            </div>

            <div className="mb-2">
              <h4 className="text-xl font-semibold mb-4 text-center" style={{color: '#070F2B'}}>Tech Stack</h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {experience.technologies.map((tech) => (
                  <span key={tech} className="px-3 py-1 rounded-full text-sm shadow-sm border border-gray-200 mb-2" style={{backgroundColor: '#F8F9FA', color: '#535C91'}}>
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