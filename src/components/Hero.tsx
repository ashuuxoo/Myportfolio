import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ProfileImage } from './ui/ProfileImage';
import {
  ArrowDown,
  ArrowUpRight,
  Terminal as TerminalIcon,
  Code2,
  FileText,
  MapPin,
  Sparkles,
} from 'lucide-react';

interface HeroProps {
  onOpenResume?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  // Terminal typing animation states
  const [terminalStep, setTerminalStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTerminalStep((prev) => (prev < 4 ? prev + 1 : prev));
    }, 850);
    return () => clearInterval(timer);
  }, []);

  const floatingTags = [
    { label: 'Python & SQL', color: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/70', position: '-top-4 -left-4', delay: 0.2 },
    { label: 'React 19 & TypeScript', color: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/70', position: '-bottom-4 -left-6', delay: 0.4 },
    { label: 'Power BI & DAX', color: 'border-amber-500/40 text-amber-300 bg-amber-950/70', position: '-top-4 -right-4', delay: 0.6 },
    { label: 'AI/ML & Time Series', color: 'border-indigo-500/40 text-indigo-300 bg-indigo-950/70', position: '-bottom-4 -right-6', delay: 0.8 },
  ];

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* Ambient background light glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-purple-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute -top-10 right-10 w-72 h-72 bg-cyan-500/5 blur-[90px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Subtitle, Description, CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start z-10"
          >
            {/* Status pill badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Software, BI &amp; Data Science Roles</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6">
              Building digital{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
                experiences
              </span>{' '}
              with code, data &amp; AI.
            </h1>

            {/* Supporting line matching resume */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono text-cyan-300/90 mb-5 tracking-wide">
              <span>Python &amp; SQL</span>
              <span className="text-slate-600">•</span>
              <span>Power BI &amp; DAX</span>
              <span className="text-slate-600">•</span>
              <span>React &amp; Web Tech</span>
              <span className="text-slate-600">•</span>
              <span>Applied AI/ML</span>
            </div>

            {/* Professional Summary from Resume */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8 font-sans">
              Technology and analytics professional with hands-on experience across Python, SQL, Power BI,
              web technologies, and applied AI/ML projects. Skilled in building data pipelines, interactive
              dashboards, and practical analytical solutions — from data collection and ETL to insight delivery
              and web tools.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a
                href="#projects"
                className="px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 group cursor-pointer"
                data-cursor="PROJECTS"
              >
                <span>Explore Projects</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </a>

              {onOpenResume && (
                <button
                  onClick={onOpenResume}
                  className="px-5 py-3 rounded-xl font-semibold text-sm bg-slate-900/90 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 hover:border-cyan-500/50 transition-all flex items-center gap-2 cursor-pointer shadow-md"
                  data-cursor="RESUME"
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>View Resume</span>
                </button>
              )}

              <a
                href="https://github.com/ashuuxoo"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl font-semibold text-sm bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-white/10 hover:border-white/20 transition-all flex items-center gap-2"
                data-cursor="GITHUB"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </a>

              <a
                href="https://www.linkedin.com/in/asis-kumar-das-30978926b/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 text-sm text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1.5 transition-colors"
                data-cursor="LINKEDIN"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Terminal Window */}
            <div className="w-full max-w-xl rounded-xl bg-slate-950/90 border border-white/10 shadow-2xl overflow-hidden font-mono text-xs">
              <div className="px-3.5 py-2.5 bg-slate-900/90 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-[11px] text-slate-400 ml-1">asis@terminal ~ v1.0.0</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                  <MapPin className="w-3 h-3 text-cyan-400" />
                  <span>Bhubaneswar, Odisha</span>
                </div>
              </div>

              <div className="p-4 space-y-2.5 text-slate-300">
                <div>
                  <span className="text-cyan-400">$ whoami</span>
                  <p className="text-slate-200 mt-0.5">&gt; Asis Kumar Das (Ashis Kumar Das) • Data Science Trainee @ AISPRY</p>
                </div>

                {terminalStep >= 1 && (
                  <div>
                    <span className="text-cyan-400">$ education</span>
                    <p className="text-slate-200 mt-0.5">
                      &gt; BSc ITM (CGPA: 7.3) • NIIS Institute of Information Science &amp; Management (2021–2024)
                    </p>
                  </div>
                )}

                {terminalStep >= 2 && (
                  <div>
                    <span className="text-cyan-400">$ verified-work</span>
                    <p className="text-slate-200 mt-0.5">
                      &gt; Aficionado Analytics • Coffee Forecast • Transcript Analysis • MYNOOOK • MuviDate
                    </p>
                  </div>
                )}

                {terminalStep >= 3 && (
                  <div>
                    <span className="text-cyan-400">$ certifications</span>
                    <p className="text-slate-200 mt-0.5 flex items-center gap-1.5">
                      <span className="text-emerald-400">●</span>
                      <span>NASSCOM (Data Science) • 360DigiTMG (Python, SQL &amp; Power BI) • AISPRY</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Premium Cinematic Portrait Frame with Depth & Particles */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative mt-6 lg:mt-0"
          >
            {/* Cinematic Portrait Frame */}
            <div className="relative flex items-center justify-center">
              <ProfileImage
                variant="hero"
                alt="Asis Kumar Das - Portrait"
              />

              {/* Floating Tech Badges */}
              {floatingTags.map((tag) => (
                <motion.div
                  key={tag.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: tag.delay, duration: 0.5 }}
                  className={`absolute z-30 px-3 py-1.5 rounded-full text-xs font-mono font-medium border shadow-xl backdrop-blur-md hidden sm:block ${tag.color} ${tag.position}`}
                >
                  {tag.label}
                </motion.div>
              ))}
            </div>

            {/* Caption badge */}
            <div className="mt-4 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-white/10 text-xs font-mono text-slate-300 shadow-xl backdrop-blur-md flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Official Personal Brand Portrait</span>
              <span className="text-slate-600">•</span>
              <span className="text-cyan-300">Asis Kumar Das</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 flex flex-col items-center justify-center">
          <a
            href="#about"
            className="flex flex-col items-center text-slate-400 hover:text-cyan-400 transition-colors text-xs font-mono tracking-widest uppercase group"
          >
            <span className="mb-2">SCROLL TO EXPLORE</span>
            <ArrowDown className="w-4 h-4 animate-bounce group-hover:text-cyan-400" />
          </a>
        </div>
      </div>
    </section>
  );
};
