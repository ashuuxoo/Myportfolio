import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Sparkles, ShieldCheck, Zap } from 'lucide-react';

export type ProfileImageVariant = 'navbar' | 'hero' | 'about' | 'contact' | 'default';

interface ProfileImageProps {
  variant?: ProfileImageVariant;
  className?: string;
  alt?: string;
  showStatus?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const PRIMARY_IMAGE = '/IMG_6036.jpeg';
const SECONDARY_IMAGE = '/profile.jpg';
const FALLBACK_AVATAR = 'https://avatars.githubusercontent.com/u/116308619?v=4';

export const ProfileImage: React.FC<ProfileImageProps> = ({
  variant = 'default',
  className = '',
  alt = 'Asis Kumar Das (Ashis Kumar Das)',
  showStatus = false,
  size = 'md',
}) => {
  const [imgSrc, setImgSrc] = useState(PRIMARY_IMAGE);
  const [loadErrorCount, setLoadErrorCount] = useState(0);

  const handleImageError = () => {
    if (loadErrorCount === 0) {
      setLoadErrorCount(1);
      setImgSrc(SECONDARY_IMAGE);
    } else if (loadErrorCount === 1) {
      setLoadErrorCount(2);
      setImgSrc(FALLBACK_AVATAR);
    }
  };

  // Parallax spring physics for Hero Cinematic Frame
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']), springConfig);
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const xPct = (e.clientX - rect.left) / width - 0.5;
    const yPct = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // 1. NAVBAR AVATAR VARIANT
  if (variant === 'navbar') {
    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden p-[1.5px] bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-500 shadow-md">
          <div className="w-full h-full rounded-full overflow-hidden bg-slate-950">
            <img
              src={imgSrc}
              alt={alt}
              onError={handleImageError}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-[35%_25%] transition-transform duration-500 hover:scale-110"
              loading="eager"
            />
          </div>
        </div>
        {showStatus && (
          <span
            className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center"
            title="Available for opportunities"
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 border border-slate-950" />
          </span>
        )}
      </div>
    );
  }

  // 2. HERO CINEMATIC PORTRAIT FRAME VARIANT
  if (variant === 'hero') {
    // Subtle floating dust/light particles
    const particles = [
      { id: 1, top: '15%', left: '10%', size: 4, duration: 4.5, delay: 0 },
      { id: 2, top: '35%', left: '88%', size: 3, duration: 5.2, delay: 0.8 },
      { id: 3, top: '70%', left: '15%', size: 5, duration: 6.0, delay: 1.5 },
      { id: 4, top: '80%', left: '80%', size: 3, duration: 4.8, delay: 2.1 },
      { id: 5, top: '22%', left: '75%', size: 4, duration: 5.5, delay: 1.0 },
    ];

    return (
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-[390px] aspect-[3/4] perspective-1000 select-none group"
      >
        {/* Subtle Animated Glow behind frame */}
        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-cyan-500/25 via-sky-500/15 to-indigo-500/25 blur-2xl opacity-70 group-hover:opacity-100 group-hover:blur-3xl transition-all duration-700 animate-pulse pointer-events-none" />

        {/* Soft Gradient Outer Ring */}
        <div className="absolute -inset-1 rounded-3xl p-[2px] bg-gradient-to-br from-cyan-400/50 via-sky-300/30 to-purple-500/50 shadow-2xl transition-all duration-500 group-hover:from-cyan-400 group-hover:via-indigo-400 group-hover:to-purple-400">
          <div className="w-full h-full rounded-[22px] bg-slate-950/80" />
        </div>

        {/* 3D Tilting Cinematic Frame */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900/95 via-slate-950/95 to-[#04060a] border border-white/15 shadow-2xl backdrop-blur-xl"
        >
          {/* Subtle Floating Ambient Particles */}
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                animate={{
                  y: [-10, 10, -10],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.9, 1.2, 0.9],
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: 'easeInOut',
                }}
                style={{
                  top: p.top,
                  left: p.left,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                }}
                className="absolute rounded-full bg-cyan-300/60 blur-[0.5px] shadow-[0_0_8px_rgba(6,182,212,0.8)]"
              />
            ))}
          </div>

          {/* Primary Photo with Intelligent Object Positioning (Face Centered) */}
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={imgSrc}
              alt={alt}
              onError={handleImageError}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-[35%_25%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              loading="eager"
            />

            {/* Cinematic Vignette & Bottom Shadow */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />

            {/* Dynamic Glass Glare Sweep on Hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white to-transparent"
              style={{
                backgroundPosition: `${glareX} ${glareY}`,
              }}
            />
          </div>

          {/* Elegant Lower Glass Info Pill */}
          <div className="absolute bottom-4 left-4 right-4 z-30 p-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-white font-display text-sm font-semibold tracking-tight">
                Asis Kumar Das
              </span>
              <span className="text-[11px] font-mono text-cyan-300 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Software &amp; Data Engineer
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
              IMG_6036
            </span>
          </div>
        </motion.div>
      </div>
    );
  }

  // 3. ABOUT SECTION PORTRAIT VARIANT
  if (variant === 'about') {
    return (
      <div className="relative w-full max-w-sm rounded-2xl p-3 bg-slate-900/80 border border-white/10 shadow-2xl backdrop-blur-md group">
        {/* Soft Ambient Glow */}
        <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-cyan-500/20 via-indigo-500/10 to-transparent blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />

        <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-slate-950 border border-cyan-500/20 shadow-inner">
          <img
            src={imgSrc}
            alt={alt}
            onError={handleImageError}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-[35%_25%] transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent pointer-events-none" />

          {/* Badges on bottom of photo */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
            <span className="px-2.5 py-1 rounded bg-slate-900/90 border border-white/10 text-white font-medium shadow-md">
              Asis Kumar Das
            </span>
            <span className="px-2.5 py-1 rounded bg-cyan-950/90 border border-cyan-500/40 text-cyan-300 flex items-center gap-1 shadow-md">
              <Zap className="w-3 h-3 text-cyan-400" />
              Verified Builder
            </span>
          </div>
        </div>

        {/* Technical metadata snippet */}
        <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
          <span>Source: Personal Portrait</span>
          <span className="text-cyan-400">BSc ITM • NIIS</span>
        </div>
      </div>
    );
  }

  // 4. CONTACT SECTION PORTRAIT VARIANT
  if (variant === 'contact') {
    return (
      <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/90 border border-white/10 shadow-lg">
        <div className="relative w-12 h-12 rounded-full overflow-hidden p-[1.5px] bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-500 shrink-0">
          <div className="w-full h-full rounded-full overflow-hidden bg-slate-950">
            <img
              src={imgSrc}
              alt={alt}
              onError={handleImageError}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-[35%_25%]"
              loading="lazy"
            />
          </div>
          {showStatus && (
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950" />
          )}
        </div>
        <div className="flex flex-col text-xs font-mono">
          <span className="text-white font-semibold">Asis Kumar Das</span>
          <span className="text-cyan-400 text-[11px]">ashiskudas143@gmail.com</span>
        </div>
      </div>
    );
  }

  // 5. DEFAULT ROUNDED AVATAR (Fallback)
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-32 h-32 md:w-40 md:h-40',
    xl: 'w-64 h-64 md:w-80 md:h-80',
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        className={`relative rounded-full overflow-hidden border border-cyan-500/30 bg-slate-900 shadow-lg ${sizeClasses[size]}`}
      >
        <img
          src={imgSrc}
          alt={alt}
          onError={handleImageError}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-[35%_25%] transition-transform duration-500 hover:scale-105"
          loading="eager"
        />
        <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10 pointer-events-none" />
      </div>

      {showStatus && (
        <span
          className="absolute bottom-1 right-1 flex h-3.5 w-3.5 items-center justify-center"
          title="Available for opportunities"
        >
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 border border-slate-900" />
        </span>
      )}
    </div>
  );
};
