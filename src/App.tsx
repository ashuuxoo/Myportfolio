import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { CustomCursor } from './components/ui/CustomCursor';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { WorkflowSection } from './components/WorkflowSection';
import { Playground } from './components/Playground';
import { GithubSection } from './components/GithubSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [loadingFinished, setLoadingFinished] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
    });

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 font-sans relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background subtle noise and grid overlay */}
      <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-radial-gradient pointer-events-none z-0" />

      {/* Initial cinematic loading screen */}
      <LoadingScreen onComplete={() => setLoadingFinished(true)} />

      {/* Custom follower cursor (desktop only) */}
      <CustomCursor />

      {/* Scroll Progress Bar & indicator */}
      <ScrollProgress />

      {/* Navigation bar */}
      <Navbar onOpenResume={() => setResumeOpen(true)} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <WorkflowSection />
        <Playground />
        <GithubSection />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Resume modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}
