import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001,
  });

  const [percentage, setPercentage] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setPercentage(Math.round(latest * 100));
      setVisible(latest > 0.02 && latest < 0.99);
    });
  }, [scrollYProgress]);

  return (
    <>
      {/* Top Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2.5px] bg-white/[0.04] pointer-events-none">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 origin-left shadow-[0_0_12px_rgba(6,182,212,0.8)]"
          style={{ scaleX }}
        />
      </div>

      {/* Floating Scroll Percentage Pill on Right (Desktop Only) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/10 text-xs font-mono text-slate-300 shadow-xl pointer-events-none select-none"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-cyan-300 font-semibold">{percentage}%</span>
        <span className="text-slate-500 text-[10px]">SCROLL</span>
      </motion.div>
    </>
  );
};
