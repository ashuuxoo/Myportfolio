import React from 'react';
import { motion } from 'motion/react';
import { EXPERIENCES, CERTIFICATIONS } from '../data/experience';
import { RevealTitle } from './ui/RevealTitle';
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  GitCommit,
  Award,
  GraduationCap,
} from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative py-28 bg-[#07090e] border-t border-white/5 overflow-hidden">
      {/* Subtle ambient light */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>04 // EXPERIENCE, EDUCATION &amp; CERTIFICATIONS</span>
          </div>
          <RevealTitle as="h2" className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Professional Experience
          </RevealTitle>
          <p className="text-slate-400 mt-2 text-base sm:text-lg max-w-2xl">
            Verified timeline grounded in data science training at AISPRY, university degree at NIIS Bhubaneswar, and open-source software engineering.
          </p>
        </div>

        {/* Vertical Timeline Structure */}
        <div className="relative pl-6 sm:pl-10 border-l border-cyan-500/30 space-y-12 max-w-4xl mx-auto">
          {EXPERIENCES.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Timeline Node Point */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                  <div className="w-2 h-2 rounded-full bg-cyan-300" />
                </div>
              </div>

              {/* Experience Card */}
              <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5">
                {/* Meta header: Period, Type, Location */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-cyan-300 px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30">
                      <Calendar className="w-3 h-3" />
                      {exp.period}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {exp.type}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-mono text-slate-500">
                    <MapPin className="w-3 h-3" />
                    {exp.location}
                  </span>
                </div>

                {/* Role and Organization */}
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-200 transition-colors">
                  {exp.role}
                </h3>
                <h4 className="text-sm font-mono text-slate-400 mt-1 mb-4 flex items-center gap-1.5">
                  <GitCommit className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{exp.organization}</span>
                </h4>

                {/* General summary */}
                <p className="text-sm text-slate-300 leading-relaxed font-sans mb-4">
                  {exp.description}
                </p>

                {/* Responsibilities list */}
                <div className="space-y-2 mb-5">
                  {exp.responsibilities.map((resp, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                <div className="pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-950/60 text-slate-300 border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications Row */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                  Verified Certifications
                </h3>
                <p className="text-xs font-mono text-slate-400">
                  Formally completed credentials in Data Science, SQL, Python &amp; Business Intelligence
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.title}
                  className="p-4 rounded-xl bg-slate-950/60 border border-white/5 hover:border-cyan-500/30 transition-colors"
                >
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 inline-block mb-2">
                    {cert.issuer}
                  </span>
                  <h4 className="text-sm font-semibold text-white font-display">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 font-sans">
                    {cert.focus}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
