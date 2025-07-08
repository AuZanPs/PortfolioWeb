// src/sections/ContactSection.tsx

import { useState, useRef } from "react";
import type React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Box, Octahedron } from "@react-three/drei";
import emailjs from '@emailjs/browser'; // Import EmailJS
import { Send, Mail, MapPin, CheckCircle, AlertTriangle } from "lucide-react";
import type * as THREE from "three";

// Define the type for our submission status
type SubmissionStatus = "idle" | "sending" | "success" | "error";

// 3D Background for Contact
const FloatingContactElements = () => {
  const sphere1Ref = useRef<THREE.Mesh>(null);
  const sphere2Ref = useRef<THREE.Mesh>(null);
  const cubeRef = useRef<THREE.Mesh>(null);
  const octaRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (sphere1Ref.current) {
      sphere1Ref.current.rotation.x = state.clock.elapsedTime * 0.1;
      sphere1Ref.current.position.y = 2 + Math.sin(state.clock.elapsedTime * 0.7) * 0.3;
    }
    if (sphere2Ref.current) {
      sphere2Ref.current.rotation.z = state.clock.elapsedTime * 0.15;
      sphere2Ref.current.position.y = -1 + Math.cos(state.clock.elapsedTime * 0.9) * 0.4;
    }
    if (cubeRef.current) {
      cubeRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      cubeRef.current.position.y = 1 + Math.sin(state.clock.elapsedTime * 1.1 + 2) * 0.2;
    }
    if (octaRef.current) {
      octaRef.current.rotation.x = state.clock.elapsedTime * 0.18;
      octaRef.current.position.y = -2 + Math.cos(state.clock.elapsedTime * 0.6) * 0.25;
    }
  });

  return (
    <>
      <Sphere ref={sphere1Ref} position={[-4, 2, -2]} args={[0.5, 32, 32]}>
        <meshStandardMaterial color="#60a5fa" wireframe transparent opacity={0.4} />
      </Sphere>
      <Sphere ref={sphere2Ref} position={[4, -1, -3]} args={[0.6, 32, 32]}>
        <meshStandardMaterial color="#c084fc" wireframe transparent opacity={0.3} />
      </Sphere>
      <Box ref={cubeRef} position={[-3, 1, -1]} args={[0.4, 0.4, 0.4]}>
        <meshStandardMaterial color="#f87171" wireframe transparent opacity={0.35} />
      </Box>
      <Octahedron ref={octaRef} position={[3, -2, -2]} args={[0.4]}>
        <meshStandardMaterial color="#60a5fa" wireframe transparent opacity={0.3} />
      </Octahedron>
      <Box position={[2, 3, -4]} args={[0.3, 0.3, 0.3]}>
        <meshStandardMaterial color="#c084fc" wireframe transparent opacity={0.2} />
      </Box>
    </>
  );
};

const ContactSection = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.current) {
      return; // Should not happen
    }

    setSubmissionStatus("sending");

    // Your EmailJS credentials
    const serviceID = "service_icykdfd";
    const templateID = "template_7x57kvj";
    const publicKey = "UPE6WPe1Ci08_EqLJ";

    emailjs.sendForm(serviceID, templateID, form.current, publicKey)
      .then(
        (result) => {
          console.log("SUCCESS!", result.text);
          setSubmissionStatus("success");
          setFormData({ name: "", email: "", message: "" }); // Clear the form
          setTimeout(() => setSubmissionStatus("idle"), 5000); // Reset status after 5 seconds
        },
        (error) => {
          console.log("FAILED...", error.text);
          setSubmissionStatus("error");
          setTimeout(() => setSubmissionStatus("idle"), 5000); // Reset status after 5 seconds
        }
      );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: Mail, title: "Email", value: "mauzanps@gmail.com", description: "Send me an email anytime!" },
    { icon: MapPin, title: "Location", value: "Jakarta", description: "Available for remote work" },
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-25 -z-10">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.6} />
          <FloatingContactElements />
        </Canvas>
      </div>

      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="container-custom py-16 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-4"></div>
          <p className="text-lg text-slate-600 leading-relaxed">
            Have a project in mind or just want to say hello? Drop me a message.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="glass p-8 rounded-2xl floating-element h-full">
            <h3 className="text-2xl font-bold text-gradient-accent mb-6">Send Message</h3>
            
            {/* Add the ref to the form element */}
            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-slate-800 font-medium mb-2">Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full glass p-3 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-slate-800 placeholder-slate-500" placeholder="Your Name" required/>
              </div>
              <div>
                <label htmlFor="email" className="block text-slate-800 font-medium mb-2">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full glass p-3 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-slate-800 placeholder-slate-500" placeholder="your.email@example.com" required/>
              </div>
              <div>
                <label htmlFor="message" className="block text-slate-800 font-medium mb-2">Message</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5} className="w-full glass p-3 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-800 placeholder-slate-500" placeholder="Tell me about your project..." required/>
              </div>
              
              <button
                type="submit"
                className="w-full glass p-4 rounded-xl font-semibold hover:bg-white/50 transition-all duration-300 flex items-center justify-center gap-2 floating-element disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={submissionStatus === 'sending'}
              >
                {submissionStatus === 'sending' ? 'Sending...' : <><Send size={18} /> Send Message</>}
              </button>

              {/* Submission Status Messages */}
              {submissionStatus === 'success' && (
                <div className="flex items-center gap-2 text-green-700 font-medium p-3 bg-green-100 rounded-lg">
                  <CheckCircle size={20} />
                  <span>Message sent successfully! Thank you.</span>
                </div>
              )}
              {submissionStatus === 'error' && (
                <div className="flex items-center gap-2 text-red-700 font-medium p-3 bg-red-100 rounded-lg">
                  <AlertTriangle size={20} />
                  <span>Failed to send message. Please try again later.</span>
                </div>
              )}
            </form>
          </div>

          <div className="space-y-6">
            {contactInfo.map((info) => (
              <div key={info.title} className="glass p-6 rounded-2xl floating-element">
                <div className="flex items-start gap-4">
                  <div className="glass p-3 rounded-xl">
                    <info.icon size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">{info.title}</h4>
                    <p className="text-slate-600 font-medium mb-1">{info.value}</p>
                    <p className="text-slate-500 text-sm">{info.description}</p>
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

export default ContactSection;