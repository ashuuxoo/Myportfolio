import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable on touch / mobile devices or if user prefers reduced motion
    const checkTouch = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      );
    };

    if (checkTouch()) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check hovered element data attributes
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]');
      if (cursorTarget) {
        const text = cursorTarget.getAttribute('data-cursor');
        setCursorText(text || '');
        setIsHovered(true);
      } else {
        const interactive = target.closest('a, button, input, textarea, [role="button"]');
        if (interactive) {
          setCursorText('');
          setIsHovered(true);
        } else {
          setCursorText('');
          setIsHovered(false);
        }
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 will-change-transform"
      style={{
        x: smoothX,
        y: smoothY,
      }}
    >
      {cursorText ? (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="px-3 py-1 rounded-full bg-cyan-400 text-slate-950 text-xs font-bold font-mono tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.6)]"
        >
          {cursorText}
        </motion.div>
      ) : (
        <motion.div
          animate={{
            scale: isHovered ? 1.8 : 1,
            backgroundColor: isHovered ? 'rgba(6, 182, 212, 0.25)' : 'rgba(6, 182, 212, 0.8)',
            borderColor: isHovered ? 'rgba(6, 182, 212, 0.8)' : 'rgba(255, 255, 255, 0.2)',
          }}
          transition={{ duration: 0.15 }}
          className={`w-3.5 h-3.5 rounded-full border transition-shadow ${
            isHovered ? 'shadow-[0_0_15px_rgba(6,182,212,0.8)]' : ''
          }`}
        />
      )}
    </motion.div>
  );
};
