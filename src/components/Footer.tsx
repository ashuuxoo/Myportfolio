import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { ProfileImage } from './ui/ProfileImage';
import { useGitHub } from '../context/GitHubContext';

export const Footer: React.FC = () => {
  const { githubProfileUrl, githubAvatarUrl } = useGitHub();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#05070b] border-t border-white/5 py-12 text-slate-400 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <ProfileImage size="sm" showStatus={false} />
            <div>
              <span className="font-display font-bold text-white text-base tracking-tight block">
                ASHIS KUMAR DAS
              </span>
              <span className="text-slate-400 font-mono text-[11px]">
                Building things with code, data &amp; curiosity.
              </span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={githubProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 px-2.5 rounded-xl bg-slate-900 border border-white/5 hover:border-cyan-500/30 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
              title="GitHub (@ashuuxoo)"
              data-cursor="GITHUB"
            >
              <img
                src={githubAvatarUrl}
                alt="GitHub Avatar"
                className="w-4 h-4 rounded-full object-cover ring-1 ring-cyan-500/40 shrink-0"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://github.com/ashuuxoo.png';
                }}
              />
              <Github className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://www.linkedin.com/in/asis-kumar-das-30978926b/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-slate-900 border border-white/5 hover:border-cyan-500/30 text-slate-300 hover:text-cyan-400 transition-colors"
              title="LinkedIn"
              data-cursor="LINKEDIN"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href="mailto:ashiskudas143@gmail.com"
              className="p-2 rounded-xl bg-slate-900 border border-white/5 hover:border-cyan-500/30 text-slate-300 hover:text-white transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 border border-white/5 hover:border-cyan-500/30 text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-400">
          <p>© {currentYear} Asis Kumar Das (Ashis Kumar Das). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href="http://mynoook.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              MYNOOOK Live
            </a>
            <span>•</span>
            <a
              href={githubProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1.5"
            >
              <img
                src={githubAvatarUrl}
                alt="@ashuuxoo"
                className="w-3.5 h-3.5 rounded-full object-cover ring-1 ring-cyan-400/40 inline-block"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://github.com/ashuuxoo.png';
                }}
              />
              <span>github.com/ashuuxoo</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
