import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setLoading(false);
            if (onComplete) onComplete();
          }, 300);
          return 100;
        }
        return prev + 12;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07090e] text-slate-100 select-none"
        >
          <div className="relative flex flex-col items-center">
            {/* Monogram / Ambient background glow */}
            <div className="absolute -inset-10 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
              className="font-display tracking-[0.25em] text-center text-2xl sm:text-4xl font-bold uppercase space-y-1 sm:space-y-2"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-slate-100"
              >
                ASIS
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400"
              >
                KUMAR
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-slate-100"
              >
                DAS
              </motion.div>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-xs sm:text-sm font-mono tracking-wider text-slate-400"
            >
              INITIALIZING CREATIVE WORKSPACE
            </motion.p>

            {/* Progress line */}
            <div className="mt-6 w-48 sm:w-64 h-[2px] bg-slate-800 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              />
            </div>

            <div className="mt-2 text-[10px] font-mono text-cyan-400/80">
              {progress}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
