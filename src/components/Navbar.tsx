import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProfileImage } from './ui/ProfileImage';
import {
  Github,
  Linkedin,
  FileText,
  Menu,
  X,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface NavbarProps {
  onOpenResume?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [scrolled, setScrolled] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Minimized when scrolling down past 150px; restored when scrolling up
      if (currentScrollY > 150 && currentScrollY > lastScrollY) {
        setMinimized(true);
      } else {
        setMinimized(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'How I Build', href: '#workflow' },
    { name: 'Playground', href: '#playground' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out ${
          scrolled
            ? minimized
              ? 'py-2.5 bg-[#07090e]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-lg shadow-black/40'
              : 'py-3.5 bg-[#07090e]/80 backdrop-blur-md border-b border-white/[0.06] shadow-md shadow-black/20'
            : 'py-5 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand / Profile Avatar */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-full"
            data-cursor="ASHIS"
          >
            <div className="relative">
              <ProfileImage
                variant="navbar"
                showStatus={true}
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute -inset-1 rounded-full bg-cyan-500/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm sm:text-base font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                ASHIS
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  DEV
                </span>
              </span>
              <span className="text-[11px] font-mono text-slate-400 -mt-0.5 tracking-wider hidden sm:block">
                Asis Kumar Das
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-white/5 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-full transition-all duration-200 hover:bg-white/[0.06]"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Links: GitHub, LinkedIn, Resume */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href="https://github.com/ashuuxoo"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-white/10 transition-colors shadow-sm"
              title="GitHub Profile"
              data-cursor="GITHUB"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href="https://www.linkedin.com/in/asis-kumar-das-30978926b/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-slate-300 hover:text-cyan-400 bg-slate-900/80 hover:bg-slate-800 border border-white/10 transition-colors shadow-sm"
              title="LinkedIn Profile"
              data-cursor="LINKEDIN"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenResume}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-md shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenResume}
              className="px-2.5 py-1 text-xs font-medium rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
            >
              Resume
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-30 sm:hidden bg-[#0a0e17]/95 border-b border-white/10 backdrop-blur-2xl p-5 shadow-2xl"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-cyan-400 rounded-lg hover:bg-white/5 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-3 border-t border-white/10 flex items-center justify-around">
                <a
                  href="https://github.com/ashuuxoo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-slate-300 hover:text-white px-3 py-2 rounded-lg bg-slate-800/80 border border-white/10"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/asis-kumar-das-30978926b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-cyan-300 hover:text-cyan-200 px-3 py-2 rounded-lg bg-cyan-950/40 border border-cyan-500/30"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
