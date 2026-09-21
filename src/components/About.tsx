import React from 'react';
import { motion } from 'motion/react';
import { ProfileImage } from './ui/ProfileImage';
import { RevealTitle } from './ui/RevealTitle';
import { StatCounter } from './ui/StatCounter';
import {
  Code,
  Terminal,
  Database,
  Smartphone,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Zap,
  GraduationCap,
  Award,
  BarChart2,
} from 'lucide-react';
import { CERTIFICATIONS } from '../data/experience';
import { useGitHub } from '../context/GitHubContext';

export const About: React.FC = () => {
  const { repoCount } = useGitHub();
  const verifiedPillars = [
    {
      title: 'Data Science & BI Reporting',
      desc: 'Trained at AISPRY in end-to-end data pipeline collection, transformation, and executive Power BI KPI reporting with DAX and Power Query.',
      icon: BarChart2,
      accent: 'text-emerald-400 border-emerald-500/20 bg-emerald-950/20',
    },
    {
      title: 'Python & Data Engineering',
      desc: 'Expertise in Python, Pandas, NumPy, SQL, data cleaning, automated ETL scripts, and analytical anomaly detection.',
      icon: Terminal,
      accent: 'text-cyan-400 border-cyan-500/20 bg-cyan-950/20',
    },
    {
      title: 'Web & Full-Stack Development',
      desc: 'Building modern responsive applications using React 19, TypeScript, and Firebase. Creator of MYNOOOK and MuviDate.',
      icon: Code,
      accent: 'text-indigo-400 border-indigo-500/20 bg-indigo-950/20',
    },
    {
      title: 'Applied AI / ML & Forecasting',
      desc: 'Experience across time-series forecasting (Prophet, ARIMA), computer vision outputs (YOLOv8, OpenCV), and Google Gemini LLMs.',
      icon: Sparkles,
      accent: 'text-purple-400 border-purple-500/20 bg-purple-950/20',
    },
  ];

  return (
    <section id="about" className="relative py-28 bg-[#080b12] border-t border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>01 // PROFESSIONAL PROFILE &amp; EDUCATION</span>
          </div>
          <RevealTitle as="h2" className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            About Me
          </RevealTitle>
          <p className="text-slate-400 mt-2 text-base sm:text-lg max-w-2xl">
            A technology and analytics professional combining data engineering, business intelligence, and software craftsmanship.
          </p>
        </div>

        {/* Animated Statistics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <StatCounter
            value={repoCount}
            suffix=" Repos"
            label="Public Repositories"
            sublabel="GitHub: @ashuuxoo"
            accentColor="text-cyan-400"
          />
          <StatCounter
            value={3}
            suffix=" Creds"
            label="Verified Certifications"
            sublabel="NASSCOM • 360DigiTMG • AISPRY"
            accentColor="text-indigo-400"
          />
          <StatCounter
            value={7.3}
            decimals={1}
            suffix=" /10"
            label="Graduation CGPA"
            sublabel="BSc ITM • NIIS Bhubaneswar"
            accentColor="text-emerald-400"
          />
          <StatCounter
            value={100}
            suffix="%"
            label="Verifiable Work"
            sublabel="Direct Source Code & Live Links"
            accentColor="text-purple-400"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: About Section Portrait */}
          <div className="lg:col-span-5 flex justify-center">
            <ProfileImage variant="about" alt="Asis Kumar Das About Portrait" />
          </div>

          {/* Right Column: Professional Positioning & Story from Resume */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-slate-300">
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white leading-snug">
              Practical analytical solutions from data collection to executive insight delivery.
            </h3>

            <p className="text-base sm:text-lg leading-relaxed text-slate-300">
              I’m <strong>Asis Kumar Das</strong> (also known as Ashis Kumar Das), a technology and analytics
              professional based in Bhubaneswar, Odisha. With hands-on experience across Python, SQL, Power BI,
              web technologies, and applied AI/ML projects, I specialize in building data pipelines, interactive
              dashboards, and practical analytical tools.
            </p>

            <p className="text-sm sm:text-base leading-relaxed text-slate-400">
              As a <strong>Data Science Trainee at AISPRY</strong>, I have collected, cleaned, and transformed
              structured and semi-structured datasets, constructed interactive Power BI dashboards with DAX,
              and translated operational requirements into data-informed solutions. In parallel, I build and ship
              web applications using <strong>React 19, TypeScript, and Firebase</strong>, including my flagship
              writing workspace <strong>MYNOOOK</strong> and social cinema platform <strong>MuviDate</strong>.
            </p>

            {/* Education & Credentials Highlight Box */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-white">
                      BSc – Information Technology &amp; Management (CGPA: 7.3)
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      2021–2024
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 font-mono">
                    NIIS Institute of Information Science &amp; Management, Bhubaneswar
                  </p>
                </div>
              </div>

              {/* Verified Certifications from Resume */}
              <div className="pt-3 border-t border-white/5">
                <span className="text-[11px] font-mono text-slate-400 block mb-2">
                  VERIFIED PROFESSIONAL CERTIFICATIONS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
                  {CERTIFICATIONS.map((cert) => (
                    <div
                      key={cert.title}
                      className="p-2.5 rounded-lg bg-slate-950/60 border border-white/5"
                    >
                      <span className="text-cyan-300 font-semibold block text-[11px] truncate">
                        {cert.title}
                      </span>
                      <span className="text-slate-400 text-[10px] block mt-0.5">
                        {cert.issuer}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Core Competency Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {verifiedPillars.map((pillar) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="p-4 rounded-xl bg-slate-900/60 border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className={`p-2 rounded-lg border ${pillar.accent}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-white font-display">
                        {pillar.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Quick Links */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono">
              <a
                href="https://github.com/ashuuxoo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
              >
                <span>github.com/ashuuxoo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <span className="text-slate-600">•</span>
              <a
                href="https://www.linkedin.com/in/asis-kumar-das-30978926b/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white underline underline-offset-4"
              >
                <span>linkedin.com/in/asis-kumar-das-30978926b</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
