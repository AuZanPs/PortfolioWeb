// src/App.tsx

import { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './sections/HeroSection';
import PerformanceMonitor from './components/PerformanceMonitor';

// Lazy load sections for better performance
const AboutSection = lazy(() => import('./sections/AboutSection'));
const SkillsSection = lazy(() => import('./sections/SkillsSection'));
const ProjectsSection = lazy(() => import('./sections/ProjectsSection'));
const ContactSection = lazy(() => import('./sections/ContactSection'));

// Loading fallback component
const SectionFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="glass p-8 rounded-2xl">
      <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
      <p className="mt-4 text-slate-600 text-center">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <div className="bg-gray-50 text-gray-900">
      <PerformanceMonitor />
      <Navbar />
      <HeroSection />
      <Suspense fallback={<SectionFallback />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <SkillsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ProjectsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ContactSection />
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;