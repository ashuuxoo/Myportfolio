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
} from 'lucide-react';
import { RevealTitle } from './ui/RevealTitle';

export const GithubSection: React.FC = () => {
  const repos = [
    {
      name: 'Mynoook',
      fullName: 'ashuuxoo/Mynoook',
      url: 'https://github.com/ashuuxoo/Mynoook',
      liveUrl: 'http://mynoook.vercel.app/',
      desc: 'A modern browser-based writing workspace for creating, organizing, editing, translating and exporting books. Flagship live web application.',
      language: 'TypeScript / React 19',
      langColor: 'bg-blue-400',
      tag: 'Flagship Web App',
      icon: BookOpen,
    },
    {
      name: 'Muvidate',
      fullName: 'ashuuxoo/Muvidate',
      url: 'https://github.com/ashuuxoo/Muvidate',
      liveUrl: 'http://muvidate.vercel.app/',
      desc: 'A social movie watch-party application that combines synchronized playback, real-time chat, and voice notes with Firebase.',
      language: 'TypeScript / React',
      langColor: 'bg-purple-400',
      tag: 'Real-Time Web',
      icon: Code2,
    },
    {
      name: 'retail-analytics-aficionado',
      fullName: 'ashuuxoo/retail-analytics-aficionado',
      url: 'https://github.com/ashuuxoo/retail-analytics-aficionado',
      liveUrl: 'https://coffee-forecast-dashboard.streamlit.app/',
      desc: 'Transaction-level retail POS analytics modeling product velocity, revenue contribution margins, category trends, and Pareto concentration.',
      language: 'Python / Streamlit',
      langColor: 'bg-emerald-400',
      tag: 'Business Intelligence',
      icon: BarChart2,
    },
    {
      name: 'coffee-forecast-dashboard',
      fullName: 'ashuuxoo/coffee-forecast-dashboard',
      url: 'https://github.com/ashuuxoo/coffee-forecast-dashboard',
      liveUrl: 'https://retail-analytics-aficionado-nn73sks3ooiojkrr3s3v7e.streamlit.app/',
      desc: 'Demand forecasting dashboard predicting peak sales periods, trend trajectories, and supporting inventory, staffing and revenue planning with Meta Prophet.',
      language: 'Python / Prophet',
      langColor: 'bg-amber-400',
      tag: 'Time Series / ML',
      icon: Cpu,
    },
    {
      name: 'Looklikepro',
      fullName: 'ashuuxoo/Looklikepro',
      url: 'https://github.com/ashuuxoo/Looklikepro',
      liveUrl: 'https://github.com/ashuuxoo/Looklikepro/actions',
      desc: 'Native Android application built with Kotlin and Jetpack Compose for low-latency phone number resolution and carrier intelligence. Includes CI workflow build.',
      language: 'Kotlin / Compose',
      langColor: 'bg-indigo-400',
      tag: 'Native Android (APK CI)',
      icon: Smartphone,
    },
  ];

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
              Public software repositories maintained on GitHub. Clean commits, documented READMEs, live deployments, and verifiable code.
            </p>
          </div>

          <a
            href="https://github.com/ashuuxoo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-white/10 hover:border-white/25 text-xs sm:text-sm font-medium transition-all shadow-md group shrink-0"
            data-cursor="GITHUB"
          >
            <span>View GitHub Profile</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>
        </div>

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {repos.map((repo, idx) => {
            const IconComponent = repo.icon;
            return (
              <motion.div
                key={repo.name}
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
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-white/5">
                        {repo.tag}
                      </span>
                    </div>

                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-slate-500 hover:text-cyan-400 transition-colors"
                      title="GitHub Repository"
                      data-cursor="GITHUB"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>

                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-2 block"
                  >
                    {repo.name}
                  </a>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans line-clamp-3 mb-4">
                    {repo.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <span className={`w-2.5 h-2.5 rounded-full ${repo.langColor}`} />
                    <span>{repo.language}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {repo.liveUrl && (
                      <a
                        href={repo.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 hover:underline"
                        data-cursor="LAUNCH"
                      >
                        <span>Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-slate-400 hover:text-white"
                    >
                      Repo
                    </a>
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
