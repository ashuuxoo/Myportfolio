import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../data/projects';
import { Project, ProjectCategory } from '../types';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { RevealTitle } from './ui/RevealTitle';
import { Layers, Sparkles, FolderGit2, ExternalLink } from 'lucide-react';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories: ProjectCategory[] = ['All', 'Web', 'AI / ML', 'Data', 'Analytics', 'Mobile'];

  const filteredProjects = PROJECTS.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category.includes(selectedCategory);
  });

  return (
    <section id="projects" className="relative py-28 bg-[#080b12] border-t border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-3">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>03 // PUBLIC PORTFOLIO CODEBASES</span>
            </div>
            <RevealTitle as="h2" className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Things I've Built
            </RevealTitle>
            <p className="text-slate-400 mt-2 text-base sm:text-lg max-w-2xl">
              From data pipelines to real-time products. Every project listed here is public,
              verifiable, and grounded directly in source code.
            </p>
          </div>

          {/* GitHub Source Note */}
          <div className="text-xs font-mono text-slate-400 shrink-0 flex items-center gap-2 p-3 rounded-xl bg-slate-900/60 border border-white/5">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>5 Public GitHub Repositories</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap border ${
                selectedCategory === cat
                  ? 'bg-cyan-500/15 border-cyan-400/50 text-cyan-200 shadow-md shadow-cyan-500/10'
                  : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white hover:border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={(proj) => setActiveModalProject(proj)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Detail Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
