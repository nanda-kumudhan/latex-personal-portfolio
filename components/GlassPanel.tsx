import { Box } from '@radix-ui/themes';
import styles from '../styles/glassPanel.module.css';
import React from 'react';

interface GlassPanelProps {
  accent?: 'default' | 'hero' | 'section';
  children?: React.ReactNode;
  className?: string;
  id?: string;
}

export default function GlassPanel({
  accent = 'default',
  children,
  className,
  id,
}: GlassPanelProps) {
  const panelClass = `${styles.glassPanel} ${styles[`accent_${accent}`]} ${className || ''}`.trim();

  return (
    <Box className={panelClass} id={id}>
      {children}
    </Box>
  );
}
