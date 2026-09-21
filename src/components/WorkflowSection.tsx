import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { WORKFLOW_STEPS } from '../data/workflow';
import { RevealTitle } from './ui/RevealTitle';
import {
  Search,
  PenTool,
  Code2,
  CheckCircle2,
  BarChart,
  Rocket,
  ArrowRight,
  Workflow,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

export const WorkflowSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search':
        return Search;
      case 'PenTool':
        return PenTool;
      case 'Code2':
        return Code2;
      case 'CheckCircle2':
        return CheckCircle2;
      case 'BarChart':
        return BarChart;
      case 'Rocket':
        return Rocket;
      default:
        return Workflow;
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  return (
    <section id="workflow" className="relative py-28 bg-[#080b12] border-t border-white/5 overflow-hidden">
      {/* Ambient background blur */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[300px] bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-3">
              <Workflow className="w-3.5 h-3.5" />
              <span>05 // ENGINEERING METHODOLOGY</span>
            </div>
            <RevealTitle as="h2" className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              How I Build
            </RevealTitle>
            <p className="text-slate-400 mt-2 text-base sm:text-lg max-w-2xl">
              A disciplined personal framework for turning ambiguous problems into resilient, scalable, and
              aesthetic digital products.
            </p>
          </div>

          {/* Scroll Navigation Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={scrollLeft}
              className="p-2.5 rounded-xl bg-slate-900/80 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="p-2.5 rounded-xl bg-slate-900/80 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Card Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 no-scrollbar snap-x snap-mandatory"
        >
          {WORKFLOW_STEPS.map((step, idx) => {
            const IconComponent = getStepIcon(step.icon);
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="w-80 sm:w-96 shrink-0 snap-start rounded-2xl bg-slate-900/80 border border-white/10 hover:border-cyan-500/40 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5 group"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-3xl sm:text-4xl font-black text-slate-700 group-hover:text-cyan-400/80 transition-colors">
                      {step.number}
                    </span>
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-white/10 text-cyan-400 group-hover:border-cyan-500/30 transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-200 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs font-mono text-cyan-400/90 mt-0.5 mb-3">
                    {step.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-5">
                    {step.description}
                  </p>
                </div>

                {/* Key Activities */}
                <div className="pt-4 border-t border-white/5 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                    Execution Highlights
                  </span>
                  {step.activities.map((act, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="text-cyan-400 text-[10px]">●</span>
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
