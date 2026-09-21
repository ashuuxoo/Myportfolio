import React from 'react';
import { motion } from 'motion/react';
import {
  Github,
  GitBranch,
  ArrowUpRight,
  ExternalLink,
  BookOpen,
  FolderGit2,
  Code2,
  Cpu,
  Smartphone,
  BarChart2,
  Radio,
  Sparkles,
} from 'lucide-react';
import { RevealTitle } from './ui/RevealTitle';
import { useGitHub } from '../context/GitHubContext';

export const GithubSection: React.FC = () => {
  const { projects, repoCount, githubProfileUrl, githubAvatarUrl, githubUser } = useGitHub();

  // Helper to choose appropriate category icon
  const getRepoIcon = (category: string[], id: string) => {
    if (id.includes('mynoook') || id.includes('mynook')) return BookOpen;
    if (category.includes('Mobile') || id.includes('looklikepro')) return Smartphone;
    if (category.includes('Analytics') || id.includes('retail')) return BarChart2;
    if (category.includes('AI / ML') || id.includes('forecast')) return Cpu;
    if (category.includes('Web')) return Code2;
    return FolderGit2;
  };

  const getLangColor = (category: string[]) => {
    if (category.includes('Mobile')) return 'bg-indigo-400';
    if (category.includes('Analytics')) return 'bg-emerald-400';
    if (category.includes('AI / ML')) return 'bg-amber-400';
    if (category.includes('Web')) return 'bg-cyan-400';
    return 'bg-blue-400';
  };

  return (
    <section className="relative py-24 bg-[#080b12] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-3">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>07 // OPEN SOURCE ECOSYSTEM</span>
            </div>
            <RevealTitle as="h2" className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight flex items-center gap-3">
              Open Source / GitHub
            </RevealTitle>
            <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-xl">
              Public software repositories maintained on GitHub. Dynamically synchronized directly from{' '}
              <span className="text-cyan-400 font-mono">@ashuuxoo</span> with live commits, documented READMEs, and verifiable code.
            </p>
          </div>

          <a
            href={githubProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-white/10 hover:border-white/25 text-xs sm:text-sm font-medium transition-all shadow-md group shrink-0"
            data-cursor="GITHUB"
          >
            <img
              src={githubAvatarUrl}
              alt="GitHub Profile Avatar"
              className="w-5 h-5 rounded-full object-cover ring-1 ring-cyan-400/40 shrink-0"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://github.com/ashuuxoo.png`;
              }}
            />
            <span>View GitHub Profile ({repoCount})</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>
        </div>

        {/* Dynamic GitHub Profile Identity Card */}
        <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-950/90 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 relative overflow-hidden backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <img
                src={githubAvatarUrl}
                alt={githubUser?.name || 'GitHub Profile Avatar'}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover ring-2 ring-cyan-500/30 shadow-lg shadow-cyan-500/10"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://github.com/ashuuxoo.png`;
                }}
              />
              <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-slate-950 border border-white/15 text-white">
                <Github className="w-3 h-3 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-white text-base sm:text-lg">
                  {githubUser?.name || 'Asis Kumar Das'}
                </h3>
                <span className="font-mono text-xs text-cyan-400">@ashuuxoo</span>
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-xl line-clamp-2">
                {githubUser?.bio || 'Technology and analytics professional • Data Science, BI Reporting & Applied AI'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
            <div className="text-right hidden md:block font-mono text-xs text-slate-400">
              <span className="text-white font-bold">{repoCount}</span> Public Repos
            </div>
            <a
              href={githubProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-white border border-white/10 text-xs font-mono font-medium transition-all shadow-sm group"
              data-cursor="GITHUB"
            >
              <span>github.com/ashuuxoo</span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            </a>
          </div>
        </div>

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((repo, idx) => {
            const IconComponent = getRepoIcon(repo.category, repo.id);
            const langColor = getLangColor(repo.category);
            const primaryLang = repo.techStack[0] || (repo.category[0] ? `${repo.category[0]} Project` : 'Source Code');

            return (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-6 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 hover:bg-slate-900/95 flex flex-col justify-between group relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-slate-950 border border-white/5 text-cyan-400">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-white/5 line-clamp-1 max-w-[170px]">
                        {repo.type || (repo.isPrimary ? 'Flagship' : repo.category.join(' • '))}
                      </span>
                    </div>

                    {repo.githubUrl && (
                      <a
                        href={repo.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-slate-500 hover:text-cyan-400 transition-colors"
                        title="GitHub Repository"
                        data-cursor="GITHUB"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <a
                    href={repo.githubUrl || githubProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-2 block line-clamp-1"
                  >
                    {repo.title}
                  </a>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans line-clamp-3 mb-4">
                    {repo.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <span className={`w-2.5 h-2.5 rounded-full ${langColor}`} />
                    <span className="line-clamp-1 max-w-[120px]">{primaryLang}</span>
                  </div>

                  {/* Strictly follows rule: If deployment URL exists, show Demo + Repo. If not, show Repo. */}
                  <div className="flex items-center gap-2">
                    {repo.liveUrl ? (
                      <>
                        <a
                          href={repo.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 hover:underline font-semibold"
                          data-cursor="LAUNCH"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <a
                          href={repo.githubUrl || githubProfileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-slate-400 hover:text-white"
                        >
                          View GitHub
                        </a>
                      </>
                    ) : (
                      <a
                        href={repo.githubUrl || githubProfileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-slate-300 hover:text-white font-medium"
                      >
                        <span>View GitHub</span>
                        <ArrowUpRight className="w-3 h-3 text-slate-400" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
