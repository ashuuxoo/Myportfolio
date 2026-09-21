import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

interface StatCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  label: string;
  sublabel?: string;
  accentColor?: string;
}

export const StatCounter: React.FC<StatCounterProps> = ({
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
  duration = 1.6,
  label,
  sublabel,
  accentColor = 'text-cyan-400',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      // Ease out expo
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = easeOut * value;

      setDisplayValue(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, value, duration]);

  const formattedValue = decimals > 0 ? displayValue.toFixed(decimals) : Math.round(displayValue);

  return (
    <div ref={ref} className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-white/10 transition-colors">
      <div className="flex items-baseline gap-0.5">
        {prefix && <span className={`font-display text-xl font-bold ${accentColor}`}>{prefix}</span>}
        <span className={`font-display text-3xl sm:text-4xl font-bold tracking-tight ${accentColor}`}>
          {formattedValue}
        </span>
        {suffix && <span className={`font-display text-2xl sm:text-3xl font-bold ${accentColor}`}>{suffix}</span>}
      </div>
      <div className="mt-1 text-xs sm:text-sm font-semibold text-white font-display">
        {label}
      </div>
      {sublabel && (
        <div className="text-[11px] font-mono text-slate-400 mt-0.5">
          {sublabel}
        </div>
      )}
    </div>
  );
};
