// src/sections/ContactSection.tsx

import { useState, useRef } from "react";
import type React from "react";
import emailjs from '@emailjs/browser'; // Import EmailJS
import { Send, Mail, MapPin, Phone, CheckCircle, AlertTriangle } from "lucide-react";

// Define the type for our submission status
type SubmissionStatus = "idle" | "sending" | "success" | "error";

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
    { icon: Mail, title: "Email", value: "hello@frontend.dev", description: "Send me an email anytime!" },
    { icon: MapPin, title: "Location", value: "San Francisco, CA", description: "Available for remote work" },
    { icon: Phone, title: "Phone", value: "+1 (555) 123-4567", description: "Mon-Fri from 8am to 6pm" }
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
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