import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGitHub } from '../context/GitHubContext';
import { Project, ProjectCategory } from '../types';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { RevealTitle } from './ui/RevealTitle';
import { Layers, Sparkles, FolderGit2, ExternalLink, RefreshCw, CheckCircle } from 'lucide-react';

export const Projects: React.FC = () => {
  const { projects, repoCount, isSyncing, refresh, githubProfileUrl } = useGitHub();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories: ProjectCategory[] = ['All', 'Web', 'AI / ML', 'Data', 'Analytics', 'Mobile'];

  const filteredProjects = projects.filter((p) => {
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
              From data pipelines to real-time products. Every project is dynamically fetched from{' '}
              <a
                href={githubProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
              >
                github.com/ashuuxoo
              </a>
              , fully verified and auto-updated.
            </p>
          </div>

          {/* GitHub Auto-Sync Status Badge */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => refresh()}
              disabled={isSyncing}
              title="Click to re-sync with GitHub"
              className="text-xs font-mono text-slate-300 hover:text-white flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 transition-all cursor-pointer group shadow-sm"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isSyncing ? 'bg-amber-400 animate-ping' : 'bg-emerald-400 animate-pulse'
                }`}
              />
              <span className="font-medium">
                {isSyncing ? 'Syncing GitHub...' : `${repoCount} Public GitHub Repos`}
              </span>
              <RefreshCw
                className={`w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition-transform ${
                  isSyncing ? 'animate-spin text-cyan-400' : 'group-hover:rotate-180'
                }`}
              />
            </button>
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
