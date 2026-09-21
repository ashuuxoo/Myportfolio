import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  Download,
  X,
  Mail,
  Linkedin,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  GraduationCap,
  Award,
  Printer,
  Phone,
  MapPin,
  Github,
} from 'lucide-react';
import { ProfileImage } from './ui/ProfileImage';
import { CERTIFICATIONS } from '../data/experience';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'view' | 'download'>('view');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#04060a]/90 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl rounded-2xl bg-[#090d16] border border-white/15 p-5 sm:p-8 shadow-2xl z-10 my-8 max-h-[92vh] flex flex-col"
        >
          {/* Header Controls */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4 shrink-0">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <FileText className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                  Asis Kumar Das — Professional Resume
                </h3>
                <p className="text-xs font-mono text-cyan-400">
                  Verified against official resume &amp; GitHub
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="p-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Print or Save as PDF"
              >
                <Printer className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Structured Resume View */}
          <div className="overflow-y-auto pr-2 space-y-6 text-slate-300 font-sans text-xs sm:text-sm">
            {/* Contact Header */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <ProfileImage variant="navbar" showStatus={true} />
                <div>
                  <h4 className="font-display text-base sm:text-lg font-bold text-white">
                    ASIS KUMAR DAS
                  </h4>
                  <p className="text-xs font-mono text-cyan-300">
                    Technology &amp; Analytics Professional
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  Bhubaneswar, Odisha
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  +91 8847840627
                </span>
                <a
                  href="mailto:ashiskudas143@gmail.com"
                  className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  ashiskudas143@gmail.com
                </a>
                <a
                  href="https://github.com/ashuuxoo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                  github.com/ashuuxoo
                </a>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="space-y-1.5">
              <h5 className="font-mono text-xs text-cyan-400 font-semibold tracking-wider uppercase">
                Professional Summary
              </h5>
              <p className="leading-relaxed text-slate-300 bg-slate-900/50 p-3.5 rounded-xl border border-white/5">
                Technology and analytics professional with hands-on experience across Python, SQL, Power BI,
                web technologies, and applied AI/ML projects. Skilled in building data pipelines, interactive
                dashboards, and practical analytical solutions—from data collection and ETL to insight delivery
                and web-based tools. Adaptable across software development, web development, business intelligence,
                and data science roles.
              </p>
            </div>

            {/* Experience */}
            <div className="space-y-2">
              <h5 className="font-mono text-xs text-cyan-400 font-semibold tracking-wider uppercase">
                Work Experience
              </h5>
              <div className="p-4 rounded-xl bg-slate-900/70 border border-white/10 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-display font-bold text-white text-sm sm:text-base">
                    AISPRY — Data Science Trainee
                  </span>
                  <span className="text-xs font-mono text-cyan-300 px-2.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30">
                    Bhubaneswar, Odisha
                  </span>
                </div>
                <ul className="space-y-1.5 list-disc list-inside text-slate-300 text-xs sm:text-sm">
                  <li>Collected, cleaned, and transformed structured and semi-structured data using Python and SQL.</li>
                  <li>Built interactive Power BI dashboards for KPI monitoring, performance tracking, and reporting.</li>
                  <li>Analyzed trends, patterns, and anomalies to support data-informed decisions.</li>
                  <li>Collaborated with business stakeholders to translate requirements into analytical solutions.</li>
                  <li>Maintained data quality, consistency, and integrity across reporting layers.</li>
                </ul>
              </div>
            </div>

            {/* Technical Skills */}
            <div className="space-y-2">
              <h5 className="font-mono text-xs text-cyan-400 font-semibold tracking-wider uppercase">
                Technical Skills
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-white/5">
                  <span className="text-slate-400 block text-[10px]">PROGRAMMING &amp; DATA</span>
                  <span className="text-white font-medium">Python, SQL, JavaScript, HTML</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-white/5">
                  <span className="text-slate-400 block text-[10px]">DATA ANALYTICS &amp; BI</span>
                  <span className="text-white font-medium">Power BI, DAX, Power Query, Excel, KPI Reporting</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-white/5">
                  <span className="text-slate-400 block text-[10px]">DATA ENGINEERING</span>
                  <span className="text-white font-medium">ETL, Data Cleaning, Transformation, Pandas, NumPy</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-white/5">
                  <span className="text-slate-400 block text-[10px]">AI / ML &amp; TIME SERIES</span>
                  <span className="text-white font-medium">Prophet, ARIMA, SARIMA, XGBoost, YOLOv8, NLP</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-white/5">
                  <span className="text-slate-400 block text-[10px]">WEB DEVELOPMENT</span>
                  <span className="text-white font-medium">React 19, TypeScript, Vite, Tailwind CSS</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-white/5">
                  <span className="text-slate-400 block text-[10px]">TOOLS &amp; PLATFORMS</span>
                  <span className="text-white font-medium">Streamlit, Firebase, MongoDB, Git, GitHub</span>
                </div>
              </div>
            </div>

            {/* Selected Projects */}
            <div className="space-y-2">
              <h5 className="font-mono text-xs text-cyan-400 font-semibold tracking-wider uppercase">
                Selected Projects
              </h5>
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-lg bg-slate-950/60 border border-white/5">
                  <strong className="text-white block text-sm">Retail Analytics – Aficionado Coffee Roasters</strong>
                  <p className="text-slate-400 mt-0.5">
                    Analyzed transaction-level retail data, product performance, revenue contribution, category trends, and Pareto concentration; developed a Streamlit dashboard for product and store insights.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/60 border border-white/5">
                  <strong className="text-white block text-sm">Coffee Forecast Dashboard</strong>
                  <p className="text-slate-400 mt-0.5">
                    Built a time-series forecasting dashboard using Python, Prophet, Pandas, and Streamlit to predict demand, identify peak periods, and support inventory and staffing planning.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/60 border border-white/5">
                  <strong className="text-white block text-sm">Automated Transcript Analysis</strong>
                  <p className="text-slate-400 mt-0.5">
                    Created a Python and SQL ETL pipeline to structure interview transcript data; developed Power BI dashboards to visualize sentiment, candidate performance, and hiring trends.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/60 border border-white/5">
                  <strong className="text-white block text-sm">Power Trading Analysis &amp; Forecasting</strong>
                  <p className="text-slate-400 mt-0.5">
                    Analyzed historical trading data with SQL and Python, identified demand patterns and price trends, and created Power BI reports for performance monitoring.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/60 border border-white/5">
                  <strong className="text-white block text-sm">MuviDate – Real-Time Movie Watch-Party Web App</strong>
                  <p className="text-slate-400 mt-0.5">
                    Developed a responsive React 19 and TypeScript application with Firebase Authentication, Firestore, and Realtime Database. Implemented private watch rooms, synchronized playback, live chat, voice notes, and movie search.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/60 border border-white/5">
                  <strong className="text-white block text-sm">MYNOOOK (Flagship Web Application)</strong>
                  <p className="text-slate-400 mt-0.5">
                    Browser-based writing workspace for creating, organizing, editing, translating and exporting books. Integrated Gemini AI and real-time cloud sync. Live at http://mynoook.vercel.app/
                  </p>
                </div>
              </div>
            </div>

            {/* Education & Certifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/10 space-y-1">
                <span className="font-mono text-[10px] text-cyan-400 uppercase font-semibold">EDUCATION</span>
                <h6 className="text-white font-bold text-xs sm:text-sm">BSc – Information Technology &amp; Management</h6>
                <p className="text-slate-400 text-xs font-mono">
                  NIIS Institute of Information Science &amp; Management, Bhubaneswar
                </p>
                <span className="inline-block mt-1 text-[11px] font-mono text-cyan-300">
                  CGPA: 7.3 | 2021–2024
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/10 space-y-1">
                <span className="font-mono text-[10px] text-cyan-400 uppercase font-semibold">CERTIFICATIONS</span>
                <ul className="text-xs text-slate-300 space-y-1 font-mono">
                  <li>• Python &amp; Data Science – NASSCOM</li>
                  <li>• Python, SQL &amp; Power BI – 360DigiTMG</li>
                  <li>• Internship Projects – AISPRY</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 mt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/25 flex items-center gap-2 cursor-pointer transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Save / Print PDF</span>
              </button>

              <a
                href="mailto:ashiskudas143@gmail.com?subject=Direct%20Resume%20Request%20-%20Asis%20Kumar%20Das"
                className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 flex items-center gap-2 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Email Directly</span>
              </a>
            </div>

            <a
              href="https://www.linkedin.com/in/asis-kumar-das-30978926b/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-slate-800 hover:bg-slate-700 text-white border border-white/10 flex items-center gap-2 transition-colors"
            >
              <Linkedin className="w-4 h-4 text-cyan-400" />
              <span>LinkedIn Credentials</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
