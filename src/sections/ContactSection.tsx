// src/sections/ContactSection.tsx

import { useState } from "react";
import type React from "react";
import emailjs from '@emailjs/browser'; // Import EmailJS
import { Send, Mail, MapPin, CheckCircle, AlertTriangle } from "lucide-react";

// Define the type for our submission status
type SubmissionStatus = "idle" | "sending" | "success" | "error";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState<SubmissionStatus>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: "Auzan Putra Siregar",
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
    }

    // Reset status after 5 seconds
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <section id="contact" className="py-20 relative" style={{backgroundColor: 'white'}}>
      <div className="container-custom py-16 relative z-10">
        <div className="text-center mb-8 sm:mb-12 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{color: '#070F2B'}}>Get In Touch</h2>
          <div className="w-24 h-1 mx-auto mb-6" style={{background: 'linear-gradient(to right, #1B1A55, #535C91)'}}></div>
          <p className="max-w-2xl mx-auto text-sm sm:text-base" style={{color: '#535C91'}}>
            Have a project in mind? Let's connect and discuss how we can bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto px-4">
          {/* Contact Form */}
          <div className="p-5 sm:p-6 md:p-8 rounded-2xl" style={{backgroundColor: 'white', boxShadow: '0 4px 6px -1px rgba(7, 15, 43, 0.1), 0 2px 4px -1px rgba(7, 15, 43, 0.06)', border: '1px solid rgba(83, 92, 145, 0.1)'}}>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6" style={{color: '#070F2B'}}>Send Me a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-medium mb-2" style={{color: '#070F2B'}}>
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  style={{
                    backgroundColor: 'white',
                    borderColor: '#535C91',
                    color: '#070F2B'
                  }}
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-2" style={{color: '#070F2B'}}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  style={{
                    backgroundColor: 'white',
                    borderColor: '#535C91',
                    color: '#070F2B'
                  }}
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-medium mb-2" style={{color: '#070F2B'}}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm sm:text-base"
                  style={{
                    backgroundColor: 'white',
                    borderColor: '#535C91',
                    color: '#070F2B'
                  }}
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-3 sm:py-4 px-5 sm:px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                style={{
                  backgroundColor: status === "sending" ? '#535C91' : '#070F2B',
                  color: 'white'
                }}
              >
                {status === "sending" ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} className="sm:w-5 sm:h-5" />
                    Send Message
                  </>
                )}
              </button>

              {/* Status Messages */}
              {status === "success" && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 sm:p-4 rounded-xl">
                  <CheckCircle size={18} className="sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">Message sent successfully! I'll get back to you soon.</span>
                </div>
              )}

              {status === "error" && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 sm:p-4 rounded-xl">
                  <AlertTriangle size={18} className="sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">Failed to send message. Please try again.</span>
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8">
            <div className="p-5 sm:p-6 md:p-8 rounded-2xl" style={{backgroundColor: 'white', boxShadow: '0 4px 6px -1px rgba(7, 15, 43, 0.1), 0 2px 4px -1px rgba(7, 15, 43, 0.06)', border: '1px solid rgba(83, 92, 145, 0.1)'}}>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6" style={{color: '#070F2B'}}>Let's Connect</h3>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2.5 sm:p-3 rounded-xl flex-shrink-0" style={{backgroundColor: '#9290C3'}}>
                    <Mail size={20} className="sm:w-6 sm:h-6" style={{color: 'white'}} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold mb-1 text-sm sm:text-base" style={{color: '#070F2B'}}>Email</h4>
                    <p className="text-xs sm:text-sm break-all" style={{color: '#535C91'}}>mauzanps@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2.5 sm:p-3 rounded-xl flex-shrink-0" style={{backgroundColor: '#9290C3'}}>
                    <MapPin size={20} className="sm:w-6 sm:h-6" style={{color: 'white'}} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold mb-1 text-sm sm:text-base" style={{color: '#070F2B'}}>Location</h4>
                    <p className="text-xs sm:text-sm" style={{color: '#535C91'}}>Jakarta, Indonesia</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6 md:p-8 rounded-2xl" style={{backgroundColor: 'white', boxShadow: '0 4px 6px -1px rgba(7, 15, 43, 0.1), 0 2px 4px -1px rgba(7, 15, 43, 0.06)', border: '1px solid rgba(83, 92, 145, 0.1)'}}>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4" style={{color: '#070F2B'}}>Why Work With Me?</h3>
              <ul className="space-y-2.5 sm:space-y-3">
                <li className="flex items-start gap-2.5 sm:gap-3">
                  <CheckCircle size={18} className="sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" style={{color: '#1B1A55'}} />
                  <span className="text-xs sm:text-sm leading-relaxed" style={{color: '#535C91'}}>Professional communication with quick response times</span>
                </li>
                <li className="flex items-start gap-2.5 sm:gap-3">
                  <CheckCircle size={18} className="sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" style={{color: '#1B1A55'}} />
                  <span className="text-xs sm:text-sm leading-relaxed" style={{color: '#535C91'}}>Modern, responsive designs built with clean code</span>
                </li>
                <li className="flex items-start gap-2.5 sm:gap-3">
                  <CheckCircle size={18} className="sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" style={{color: '#1B1A55'}} />
                  <span className="text-xs sm:text-sm leading-relaxed" style={{color: '#535C91'}}>Collaborative approach that brings your vision to life</span>
                </li>
                <li className="flex items-start gap-2.5 sm:gap-3">
                  <CheckCircle size={18} className="sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" style={{color: '#1B1A55'}} />
                  <span className="text-xs sm:text-sm leading-relaxed" style={{color: '#535C91'}}>Ongoing support and maintenance after project completion</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;