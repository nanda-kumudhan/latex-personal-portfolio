import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import '../styles/globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [appearance, setAppearance] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Detect system preference on mount
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    
    if (savedTheme) {
      setAppearance(savedTheme);
    } else {
      setAppearance(prefersDark ? 'dark' : 'light');
    }
    
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newAppearance = appearance === 'dark' ? 'light' : 'dark';
    setAppearance(newAppearance);
    localStorage.setItem('theme', newAppearance);
  };

  // Provide theme toggle through window object for component access
  useEffect(() => {
    (window as any).__toggleTheme = toggleTheme;
    (window as any).__currentTheme = appearance;
  }, [appearance]);

  return (
    <Theme
      appearance={mounted ? appearance : 'dark'}
      accentColor="cyan"
      grayColor="slate"
      panelBackground="solid"
      scaling="100%"
    >
      <div className="background"></div>
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
    </Theme>
  );
}

export default MyApp;
