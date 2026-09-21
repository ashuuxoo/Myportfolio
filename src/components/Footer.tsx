import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { ProfileImage } from './ui/ProfileImage';

export const Footer: React.FC = () => {
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
              href="https://github.com/ashuuxoo"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-slate-900 border border-white/5 hover:border-cyan-500/30 text-slate-300 hover:text-white transition-colors"
              title="GitHub"
              data-cursor="GITHUB"
            >
              <Github className="w-4 h-4" />
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
              href="https://github.com/ashuuxoo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              github.com/ashuuxoo
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
