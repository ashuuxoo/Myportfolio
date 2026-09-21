import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Linkedin,
  Github,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ArrowUpRight,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { ProfileImage } from './ui/ProfileImage';
import { useGitHub } from '../context/GitHubContext';

export const Contact: React.FC = () => {
  const { githubProfileUrl, githubAvatarUrl } = useGitHub();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const myEmail = 'ashiskudas143@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(myEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      setErrorMessage('Please fill out all required fields.');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Send message via Formspree or fallback
      const response = await fetch('https://formspree.io/f/xvgzgzyw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          recipient: myEmail,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        // If formspree endpoint is not yet claimed by user, gracefully open mailto client
        const mailtoUrl = `mailto:${myEmail}?subject=${encodeURIComponent(
          `Portfolio Contact from ${formData.name}`
        )}&body=${encodeURIComponent(
          `Hi Ashis,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
        )}`;
        window.location.href = mailtoUrl;
        setSubmitStatus('success');
      }
    } catch (err: any) {
      // Network failure or offline
      const mailtoUrl = `mailto:${myEmail}?subject=${encodeURIComponent(
        `Portfolio Contact from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Hi Ashis,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
      )}`;
      window.location.href = mailtoUrl;
      setSubmitStatus('success');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 bg-[#07090e] border-t border-white/5 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-t from-cyan-500/10 via-indigo-500/5 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading, Text & Social Channels */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-4 self-start">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>08 // GET IN TOUCH</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              Let's Build <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                Something.
              </span>
            </h2>

            <p className="text-slate-300 mt-4 text-base sm:text-lg leading-relaxed font-sans">
              Have an idea, project, collaboration or opportunity? Let's turn it into something useful.
              I am always open to discussing full-stack engineering, machine learning pipelines, and data systems.
            </p>

            {/* Direct Email Card with One-Click Copy */}
            <div className="mt-8 p-4 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-white/10 text-cyan-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <span className="text-[10px] font-mono text-slate-400 block">DIRECT EMAIL</span>
                  <span className="text-xs sm:text-sm font-mono text-white font-medium truncate block">
                    {myEmail}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="https://www.linkedin.com/in/asis-kumar-das-30978926b/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-white/10 text-xs font-medium text-slate-200 hover:text-cyan-400 transition-colors"
                data-cursor="LINKEDIN"
              >
                <Linkedin className="w-4 h-4 text-cyan-400" />
                <span>LinkedIn Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
              </a>

              <a
                href={githubProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-white/10 text-xs font-medium text-slate-200 hover:text-white transition-colors group"
                data-cursor="GITHUB"
              >
                <img
                  src={githubAvatarUrl}
                  alt="@ashuuxoo"
                  className="w-4 h-4 rounded-full object-cover ring-1 ring-cyan-500/40 shrink-0"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://github.com/ashuuxoo.png';
                  }}
                />
                <Github className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
                <span>GitHub (@ashuuxoo)</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </a>
            </div>

            {/* Contact author card */}
            <div className="mt-8 pt-6 border-t border-white/5">
              <ProfileImage variant="contact" showStatus={true} />
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-white/10 shadow-2xl backdrop-blur-md">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
                Send a Direct Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-sans mb-6">
                Fill out the form below to initiate collaboration, discuss an engineering position, or request a product consultation.
              </p>

              {submitStatus === 'success' ? (
                <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-display text-lg font-bold text-white">Message Dispatched</h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto font-sans">
                    Thank you for reaching out. Your message has been sent. I will review it and reply as promptly as possible.
                  </p>
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="mt-3 px-4 py-2 rounded-xl text-xs font-mono bg-slate-800 text-slate-200 hover:bg-slate-700 cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {submitStatus === 'error' && (
                    <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1.5">
                      YOUR NAME <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 font-sans text-sm text-white focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1.5">
                      YOUR EMAIL <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. sarah@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 font-sans text-sm text-white focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1.5">
                      MESSAGE <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project, idea, or role opportunity..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 font-sans text-sm text-white focus:outline-none focus:border-cyan-500/50 resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Transmitting Message...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
