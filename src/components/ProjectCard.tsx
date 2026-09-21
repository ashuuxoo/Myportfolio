import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Project } from '../types';
import {
  ExternalLink,
  Github,
  Radio,
  ArrowUpRight,
  Code2,
  Terminal,
  Smartphone,
  Cpu,
  Layers,
} from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 160 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Mobile':
        return Smartphone;
      case 'Data':
      case 'Analytics':
        return Terminal;
      case 'AI / ML':
        return Cpu;
      default:
        return Code2;
    }
  };

  const IconComponent = getCategoryIcon(project.category[0]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`perspective-1000 ${project.isPrimary ? 'lg:col-span-2' : ''}`}
    >
      <motion.div
        layout
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.45 }}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className={`relative rounded-2xl bg-slate-900/80 border transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-lg ${
          project.isPrimary
            ? 'border-cyan-500/40 shadow-xl shadow-cyan-500/10 p-6 sm:p-8'
            : 'border-white/10 hover:border-cyan-500/40 p-6 hover:shadow-cyan-500/5'
        }`}
        data-cursor="VIEW"
      >
        {/* Background ambient gradient glow */}
        <div
          className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none transition-opacity duration-500 group-hover:opacity-35"
          style={{ backgroundColor: project.accentColor }}
        />

        {/* Dynamic Subtle Hover Border Glow */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5 group-hover:ring-cyan-400/25 pointer-events-none transition-all duration-500" />

        <div>
          {/* Top bar: Category + Flagship status */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950 border border-white/10 text-[11px] font-mono text-slate-300">
                <IconComponent className="w-3.5 h-3.5 text-cyan-400" />
                <span>{project.category.join(' • ')}</span>
              </span>

              {project.isPrimary && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[11px] font-mono font-semibold">
                  <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
                  FLAGSHIP LIVE APPLICATION
                </span>
              )}
            </div>

            <span className="text-[11px] font-mono text-slate-400">
              {project.type.split('/')[0]}
            </span>
          </div>

          {/* Title and Subtitle */}
          <h3
            onClick={() => onSelect(project)}
            className="font-display text-2xl sm:text-3xl font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer flex items-center gap-2"
          >
            <span>{project.title}</span>
            <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </h3>

          <p className="text-xs sm:text-sm font-mono text-cyan-400/80 mt-1 mb-3">
            {project.subtitle}
          </p>

          {/* Description */}
          <p className="text-sm text-slate-300 leading-relaxed font-sans line-clamp-3 mb-6">
            {project.description}
          </p>

          {/* Key Highlight Features (Bullet points) */}
          <div className="space-y-1.5 mb-6">
            {project.features.slice(0, project.isPrimary ? 4 : 3).map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                <span className="text-cyan-400 mt-0.5">▹</span>
                <span className="line-clamp-1">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Area: Tech stack & Action buttons */}
        <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Tech Stack Chips */}
          <div className="flex flex-wrap gap-1.5 max-w-md">
            {project.techStack.slice(0, project.isPrimary ? 6 : 4).map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950/80 text-slate-300 border border-white/5"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > (project.isPrimary ? 6 : 4) && (
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded text-slate-500">
                +{project.techStack.length - (project.isPrimary ? 6 : 4)} more
              </span>
            )}
          </div>

          {/* Buttons: Strictly obeys user rule:
              If deployment URL found: show both "Live Demo" and "View GitHub".
              If no deployment URL found: show only "View GitHub". */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {project.liveUrl ? (
              <>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-md shadow-cyan-500/20 flex items-center gap-1.5 transition-transform hover:scale-105 active:scale-95"
                  data-cursor="LAUNCH"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-950 hover:bg-slate-800 border border-white/10 transition-colors flex items-center gap-1.5"
                    title="View GitHub Repository"
                    data-cursor="GITHUB"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View GitHub</span>
                  </a>
                )}
              </>
            ) : (
              project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white border border-white/15 hover:border-cyan-500/40 transition-all flex items-center gap-1.5 shadow-sm"
                  title="View GitHub Repository"
                  data-cursor="GITHUB"
                >
                  <Github className="w-3.5 h-3.5 text-cyan-400" />
                  <span>View GitHub</span>
                </a>
              )
            )}

            <button
              onClick={() => onSelect(project)}
              className="px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-white/5 hover:border-white/10 transition-colors cursor-pointer"
            >
              Details
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
