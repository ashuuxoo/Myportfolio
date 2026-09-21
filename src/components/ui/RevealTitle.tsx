import React from 'react';
import { motion } from 'motion/react';

interface RevealTitleProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  delay?: number;
}

export const RevealTitle: React.FC<RevealTitleProps> = ({
  children,
  className = '',
  as = 'h2',
  delay = 0,
}) => {
  const words = children.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: delay * i },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(8px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring' as const,
        damping: 18,
        stiffness: 140,
      },
    },
  };

  const Component = motion[as];

  return (
    <Component
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={`inline-flex flex-wrap gap-x-2.5 gap-y-1 ${className}`}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block will-change-transform"
        >
          {word}
        </motion.span>
      ))}
    </Component>
  );
};
