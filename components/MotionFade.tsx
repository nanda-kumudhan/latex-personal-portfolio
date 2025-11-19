import React from 'react';

// Runtime dynamic import of framer-motion with graceful fallback if not installed.
let MotionDiv: React.ComponentType<any> | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const fm = require('framer-motion');
  MotionDiv = fm.motion.div;
} catch (_e) {
  MotionDiv = null;
}

interface MotionFadeProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
  y?: number;
}

export default function MotionFade({ children, delay = 0, y = 20, style, ...rest }: MotionFadeProps) {
  if (!MotionDiv) {
    return <div style={{ opacity: 1, transform: 'translateY(0)', transition: 'opacity .6s, transform .6s', ...style }} {...rest}>{children}</div>;
  }
  return (
    <MotionDiv
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay }}
      style={style}
      {...rest}
    >
      {children}
    </MotionDiv>
  );
}