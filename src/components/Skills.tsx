import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SKILL_CATEGORIES } from '../data/skills';
import { RevealTitle } from './ui/RevealTitle';
import {
  Code,
  Layers,
  Database,
  BarChart3,
  Bot,
  Smartphone,
  Wrench,
  CheckCircle2,
  Sparkles,
  Zap,
} from 'lucide-react';

export const Skills: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);

  const categoryIcons = [
    Code,       // Frontend
    Database,   // Backend & Cloud
    BarChart3,  // Data & Analytics
    Bot,        // AI / ML
    Smartphone, // Mobile
    Wrench,     // Tools
  ];

  const currentCategory = SKILL_CATEGORIES[activeCategoryIndex];

  return (
    <section id="skills" className="relative py-28 bg-[#07090e] border-t border-white/5 overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>02 // CAPABILITIES &amp; TOOLCHAIN</span>
          </div>
          <RevealTitle as="h2" className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Technical Stack
          </RevealTitle>
          <p className="text-slate-400 mt-2 text-base sm:text-lg max-w-2xl">
            Practical, verified technologies actively leveraged across production web applications, data
            pipelines, machine learning models, and native Android codebases.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar scroll-smooth">
          {SKILL_CATEGORIES.map((category, idx) => {
            const IconComponent = categoryIcons[idx] || Code;
            const isActive = idx === activeCategoryIndex;
            return (
              <button
                key={category.title}
                onClick={() => setActiveCategoryIndex(idx)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer border ${
                  isActive
                    ? 'bg-cyan-500/15 border-cyan-400/50 text-cyan-200 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-slate-200 hover:border-white/10'
                }`}
              >
                <IconComponent className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{category.title}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-cyan-400/20 text-cyan-200' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {category.skills.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Category Subtitle Description */}
        <div className="mb-8 px-4 py-3 rounded-xl bg-slate-900/40 border border-white/5 flex items-center justify-between">
          <p className="text-xs sm:text-sm text-slate-300 font-mono">
            <span className="text-cyan-400 font-bold">&gt;</span> {currentCategory.description}
          </p>
          <span className="hidden sm:block text-[11px] font-mono text-slate-500">
            {currentCategory.skills.length} verified technologies
          </span>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentCategory.skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              className="p-5 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 hover:bg-slate-900/95 hover:shadow-lg hover:shadow-cyan-500/5 group relative overflow-hidden"
            >
              {/* Subtle top accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-start justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-white/10 text-cyan-400 group-hover:text-cyan-300 group-hover:border-cyan-500/30 transition-colors">
                  <Zap className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10">
                  {skill.level}
                </span>
              </div>

              <h4 className="font-display text-base font-semibold text-white group-hover:text-cyan-200 transition-colors">
                {skill.name}
              </h4>

              <p className="mt-2 text-xs text-slate-400 leading-relaxed font-sans">
                {skill.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
